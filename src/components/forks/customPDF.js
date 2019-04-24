//@ts-check
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import Pdf from 'react-native-pdf';

export default class CustomPdf extends Pdf {

    constructor(props) {

        super(props);
    }

    _downloadFile = async (source, cacheFile) => {

        if (this.lastRNBFTask) {
            this.lastRNBFTask.cancel(err => {
            });
            this.lastRNBFTask = null;
        }

        var uri = "";
        if (Platform.OS === "android") {
            uri = decodeURI(source.uri);
        } else {
            uri = source.uri;
        }


        const tempCacheFile = cacheFile + '.tmp';
        this._unlinkFile(tempCacheFile);
        this.lastRNBFTask = RNFetchBlob.config({
            // response data will be saved to this path if it has access right.
            path: tempCacheFile,
            trusty: true,
        })
            .fetch(
                source.method ? source.method : 'GET',
                source.uri,
                source.headers ? source.headers : {},
                source.body ? source.body : ""
            )
            // listen to download progress event
            .progress((received, total) => {
                this.props.onLoadProgress && this.props.onLoadProgress(received / total);
                this.setState({ progress: received / total });
            });

        this.lastRNBFTask
            .then(async (res) => {

                this.lastRNBFTask = null;

                if (res && res.respInfo && res.respInfo.headers && !res.respInfo.headers["Content-Encoding"] && !res.respInfo.headers["Transfer-Encoding"] && res.respInfo.headers["Content-Length"]) {
                    const expectedContentLength = res.respInfo.headers["Content-Length"];
                    let actualContentLength;

                    try {
                        const fileStats = await RNFetchBlob.fs.stat(res.path());

                        if (!fileStats || !fileStats.size) {
                            throw new Error("FileNotFound:" + url);
                        }

                        actualContentLength = fileStats.size;
                    } catch (error) {
                        throw new Error("DownloadFailed:" + url);
                    }

                    if (expectedContentLength != actualContentLength) {
                        throw new Error("DownloadFailed:" + url);
                    }
                }

                this._unlinkFile(cacheFile);
                RNFetchBlob.fs
                    .cp(tempCacheFile, cacheFile)
                    .then(() => {
                        this.setState({ path: cacheFile, isDownloaded: true, progress: 1 });
                        this._unlinkFile(tempCacheFile);
                    })
                    .catch(async (error) => {
                        throw error;
                    });
            })
            .catch(async (error) => {
                this._unlinkFile(tempCacheFile);
                this._unlinkFile(cacheFile);
                this._onError(error);
            });
    };
}