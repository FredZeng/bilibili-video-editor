//================================================================================
//
// (c) Copyright China Digital Video (Beijing) Limited, 2019. All rights reserved.
//
// This code and information is provided "as is" without warranty of any kind,
// either expressed or implied, including but not limited to the implied
// warranties of merchantability and/or fitness for a particular purpose.
//
//--------------------------------------------------------------------------------
//   Birth Date:    Nov 18. 2019
//   Author:        Meishe video team
//================================================================================

class NvsEventEmitter {
    constructor() {
        this.store = {}
    }

    on(key, fn) {
        if (this.store[key]) {
            this.store[key].push(fn)
        } else {
            this.store[key] = [fn]
        }
    }

    emit(key, ...args) {
        if (!this.store[key]) {
            return
        }
        while (this.store[key].length > 0) {
            let fn = this.store[key][0]
            fn(...args)
            this.off(key, fn)
        }
    }

    off(key, fn) {
        if (!this.store[key]) {
            return
        }
        const idx = this.store[key].findIndex(i => i === fn)
        if (idx === -1) {
            return
        }
        this.store[key].splice(idx, 1)
    }
}

const nvsEventEmitter = new NvsEventEmitter();
const streamingEngineStateStopped = 'streamingEngineStateStopped';

class NvsSdkVersion {
    constructor(majorVersion, minorVersion, revisionNumber) {
        this.majorVersion = majorVersion;
        this.minorVersion = minorVersion;
        this.revisionNumber = revisionNumber;
    }
}


class NvsRational {
    constructor(numerator, denominator) {
        this.num = numerator;
        this.den = denominator;
    }
}


class NvsVideoResolution {
    constructor(imageWidth, imageHeight) {
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
    }
}


class NvsAudioResolution {
    constructor(sampleRate, channelCount) {
        this.sampleRate = sampleRate;
        this.channelCount = channelCount;
    }
}


const NvsLiveWindowFillModeEnum = Object.freeze({
    "PreserveAspectCrop" : 0,
    "PreserveAspectFit" : 1,
    "Stretch" : 2});

class NvsLiveWindow {
    constructor() {
        this.internalLiveWindow = 0;
    }

    setFillMode(fillMode) {
        Module.nvs_liveWindow_setFillMode(this.internalLiveWindow, fillMode);
    }

    getFillMode() {
        return Module.nvs_liveWindow_getFillMode(this.internalLiveWindow);
    }

    mapCanonicalToView(ptCanonical) {
        return Module.nvs_liveWindow_mapCanonicalToView(this.internalLiveWindow, ptCanonical);
    }

    mapViewToCanonical(ptView) {
        return Module.nvs_liveWindow_mapViewToCanonical(this.internalLiveWindow, ptView);
    }

    mapNormalizedToView(ptNormalized) {
        return Module.nvs_liveWindow_mapNormalizedToView(this.internalLiveWindow, ptNormalized);
    }

    mapViewToNormalized(ptView) {
        return Module.nvs_liveWindow_mapViewToNormalized(this.internalLiveWindow, ptView);
    }

    setBackgroundColor(color) {
        Module.nvs_liveWindow_setBackgroundColor(this.internalLiveWindow, color);
    }
}


const NvsVideoPreviewSizeModeEnum = Object.freeze({
    "FullSize" : 0,
    "LiveWindowSize" : 1});

const NvsSeekFlagEnum = Object.freeze({
    "ShowCaptionPoster" : 2,
    "ShowAnimatedStickerPoster" : 4,
    "BuddyHostVideoFrame" : 16});

const NvsPlaybackFlagEnum = Object.freeze({
    "LowPipelineSize" : 8,
    "DisableFixedPrerollTime" : 16,
    "BuddyHostVideoFrame" : 32});

const NvsStreamingEngineStateEnum = Object.freeze({
    "StreamingEngineStateStopped" : 0,
    "StreamingEngineStatePlayback" : 3,
    "StreamingEngineStateSeeking" : 4,
    "StreamingEngineStateCompile" : 5});

const NvsAssetPackageTypeEnum = Object.freeze({
    "VideoFx" : 0,
    "VideoTransition" : 1,
    "CaptionStyle" : 2,
    "AnimatedSticker" : 3,
    "Theme" : 4,
    "CaptureScene" : 5,
    "ARScene" : 6,
    "CompoundCaption" : 7,
    "CaptionContext" : 8,
    "CaptionRenderer" : 9,
    "CaptionAnimation" : 10,
    "CaptionInAnimation" : 11,
    "CaptionOutAnimation" : 12});

const NvsAssetPackageStatusEnum = Object.freeze({
    "NotInstalled" : 0,
    "Installing" : 1,
    "Ready" : 2,
    "Upgrading" : 3});

const NvsTrackTypeEnum = Object.freeze({
  "Video" : 0,
  "Audio" : 1});

const NvsClipTypeEnum = Object.freeze({
    "Video" : 0,
    "Audio" : 1});

const NvsVideoClipTypeEnum = Object.freeze({
  "AV" : 0,
  "Image" : 1});

const NvsVideoClipMotionModeEnum = Object.freeze({
  "LetterBoxZoomIn" : 0,
  "LetterBoxZoomOut" : 1,
  "Image_ROI" : 2});

const NvsVideoClipExtraRotationEnum = Object.freeze({
  "Rotation0" : 0,
  "Rotation90" : 1,
  "Rotation180" : 2,
  "Rotation270" : 3});

const NvsVideoClipBackgroundModeEnum = Object.freeze({
  "ColorSolid" : 0,
  "Blur" : 1});

const NvsClipRoleInThemeEnum = Object.freeze({
  "General" : 0,
  "Title" : 1,
  "Trailer" : 2});

const NvsVideoFxTypeEnum = Object.freeze({
  "Builtin" : 0,
  "Package" : 1,
  "Custom" : 2});

const NvsVideoTransitionTypeEnum = Object.freeze({
  "Builtin" : 0,
  "Package" : 1});

const NvsCaptionRoleInThemeEnum = Object.freeze({
  "General" : 0,
  "Title" : 1,
  "Trailer" : 2});

const NvsCaptionTextAlignmentEnum = Object.freeze({
  "Left" : 0,
  "Center" : 1,
  "Right" : 2});

const NvsCaptionTextBoundingTypeEnum = Object.freeze({
  "Text" : 0,
  "TextFrame" : 1,
  "Frame" : 2});

const NvsCaptionLetterSpacingTypeEnum = Object.freeze({
  "Percentage" : 0,
  "Absolute" : 1});

const NvsHumanDetectionFeatureEnum = Object.freeze({
  "FaceLandmark" : 1,
  "FaceAction" : 2,
  "AvatarExpression" : 4,
  "VideoMode" : 8,
  "ImageMode" : 16});

const NvsKeyFrameFindModeEnum = Object.freeze({
  "Before" : 1,
  "After" : 2});

const NvsClipWrapModeEnum = Object.freeze({
  "RepeatLastFrame" : 0,
  "RepeatFirstFrame" : 1,
  "Repeat" : 2});

function nvsResumeAudioContext() {
    // Under some browsers(such as chrome >= 70) The AudioContext was not allowed to start
    // if we don't resume AudioContext after a user gesture on the page.
    // For detailed information please refer to https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
    if (typeof(Module['Meishe']) === 'undefined')
        Module['Meishe'] = {};

    var Meishe = Module['Meishe'];
    if (!Meishe.audioContext) {
        if (typeof(AudioContext) !== 'undefined')
            Meishe.audioContext = new AudioContext();
        else if (typeof(webkitAudioContext) !== 'undefined')
            Meishe.audioContext = new webkitAudioContext();
        else
            return;
    }

    var audioCtx = Meishe.audioContext;
    if (audioCtx.state === 'suspended')
        audioCtx.resume();
}

function nvsGetStreamingContextInstance() {
    return Module.Meishe.streamingContext;
}

// std::vector<float>
class NvsVectorFloat {
    constructor() {
        return new Module.VectorFloat();
    }
}

// std::vector<emscripten::val>
class NvsVectorVal {
    constructor() {
        return new Module.VectorVal();
    }
}

class NvsStreamingContext {
    constructor() {
        this.onWebRequestWaitStatusChange = function(isVideo, waiting) {
        }
        this.onWebRequestAuthFinish = function(success) {
        }
        this.onPlaybackTimelinePosition = function(timeline, position) {
        }
        this.onPlaybackStopped = function(timeline) {
        }
        this.onPlaybackEOF = function(timeline) {
        }
        this._onStreamingEngineStateChanged = function(state) {
        }
        this.onImageGrabbedArrived = function(imageData, time) {
        }
    }

    get onStreamingEngineStateChanged() {
        return (state) => {
            if (state === 0) {
                nvsEventEmitter.emit(streamingEngineStateStopped);
            }
            this._onStreamingEngineStateChanged(state)
        }
    }

    set onStreamingEngineStateChanged(fun) {
        this._onStreamingEngineStateChanged = fun
    }

    streamingEngineReadyForTimelineModification() {
        let self = this;
        return new Promise((resolve, reject) => {
            if (Module.Meishe.streamingContext.getStreamingEngineState() === 0)
                resolve();
            else {
              nvsEventEmitter.on(streamingEngineStateStopped, function slot() {
                    resolve();
                });
                self.stop();
            }
        });
    }

    verifySdkLicenseFile(requestUrl) {
        return Module.nvs_streamingContext_verifySdkLicenseFile(requestUrl);
    }

    verifySdkLicenseFileWithExtraUserData(requestUrl, extraUserData) {
        Module.Meishe.ExtraUserData = extraUserData;
        return Module.nvs_streamingContext_verifySdkLicenseFileWithExtraUserData(requestUrl);
    }

    getSdkVersion() {
        return Module.nvs_streamingContext_getSdkVersion();
    }

    createTimeline(videoRes, fps, audioRes) {
        return Module.nvs_streamingContext_createTimeline(videoRes, fps, audioRes);
    }

    removeTimeline(timeline) {
        return Module.nvs_streamingContext_removeTimeline(timeline);
    }

    createLiveWindow(canvasId) {
        return Module.nvs_streamingContext_createLiveWindow(canvasId);
    }

    removeLiveWindow(liveWindow) {
        Module.nvs_streamingContext_removeLiveWindow(liveWindow);
    }

    connectTimelineWithLiveWindow(timeline, liveWindow) {
        return Module.nvs_streamingContext_connectTimelineWithLiveWindow(timeline, liveWindow);
    }

    seekTimeline(timeline, timestamp, videoSizeMode, flags) {
        return Module.nvs_streamingContext_seekTimeline(timeline, timestamp, videoSizeMode, flags);
    }

    playbackTimeline(timeline, startTime, endTime, videoSizeMode, preload, flags) {
        return Module.nvs_streamingContext_playbackTimeline(timeline, startTime, endTime, videoSizeMode, preload, flags);
    }

    stop() {
        Module.nvs_streamingContext_stop();
    }

    getTimelineCurrentPosition(timeline) {
        return Module.nvs_streamingContext_getTimelineCurrentPosition(timeline);
    }

    getStreamingEngineState() {
        return Module.nvs_streamingContext_getStreamingEngineState();
    }

    getAssetPackageManager() {
        return Module.nvs_streamingContext_getAssetPackageManager();
    }

    getAVFileInfo(avFilePath, extraFlag) {
        return Module.nvs_streamingContext_getAVFileInfo(avFilePath, extraFlag);
    }

    registerFontByFilePath(fontFilePath) {
        return Module.nvs_streamingContext_registerFontByFilePath(fontFilePath);
    }

    grabImageFromTimeline(timeline, timestamp, proxyScale, flags) {
        return Module.nvs_streamingContext_grabImageFromTimeline(timeline, timestamp, proxyScale, flags);
    }

    setAudioOutputDeviceVolume(volume) {
        Module.nvs_streamingContext_setAudioOutputDeviceVolume(volume);
    }

    setUseChineseLanguageOnly(useChineseLanguageOnly) {
        Module.nvs_streamingContext_setUseChineseLanguageOnly(useChineseLanguageOnly);
    }

    isUseChineseLanguageOnly() {
        return Module.nvs_streamingContext_isUseChineseLanguageOnly();
    }

    initHumanDetection(modelFilePath, licenseFilePath, features) {
        return Module.nvs_streamingContext_initHumanDetection(modelFilePath, licenseFilePath, features);
    }

    closeHumanDetection() {
        Module.nvs_streamingContext_closeHumanDetection();
    }

    notifyUpdateToWebReader(webAVFilePath) {
        return Module.nvs_streamingContext_notifyUpdateToWebReader(webAVFilePath);
    }
}


class NvsProjObj {
    constructor() {
        this.internalObj = 0;
    }

    setInternalObject(obj) {
        this.internalObj = obj;
    }

    getInternalObject() {
        return this.internalObj;
    }
}


class NvsTimeline extends NvsProjObj {
    constructor() {
        super();
    }

    getVideoRes() {
        return Module.nvs_timeline_getVideoRes(this.internalObj);
    }

    getAudioRes() {
        return Module.nvs_timeline_getAudioRes(this.internalObj);
    }

    getDuration() {
        return Module.nvs_timeline_getDuration(this.internalObj);
    }

    appendVideoTrack() {
        return Module.nvs_timeline_appendVideoTrack(this.internalObj);
    }

    appendAudioTrack() {
        return Module.nvs_timeline_appendAudioTrack(this.internalObj);
    }

    insertVideoTrack(insertPoint) {
        return Module.nvs_timeline_insertVideoTrack(this.internalObj, insertPoint);
    }

    insertAudioTrack(insertPoint) {
        return Module.nvs_timeline_insertAudioTrack(this.internalObj, insertPoint);
    }

    removeVideoTrack(trackIndex) {
        return Module.nvs_timeline_removeVideoTrack(this.internalObj, trackIndex);
    }

    removeAudioTrack(trackIndex) {
        return Module.nvs_timeline_removeAudioTrack(this.internalObj, trackIndex);
    }

    videoTrackCount() {
        return Module.nvs_timeline_videoTrackCount(this.internalObj);
    }

    audioTrackCount() {
        return Module.nvs_timeline_audioTrackCount(this.internalObj);
    }

    getVideoTrackByIndex(trackIndex) {
        return Module.nvs_timeline_getVideoTrackByIndex(this.internalObj, trackIndex);
    }

    getAudioTrackByIndex(trackIndex) {
        return Module.nvs_timeline_getAudioTrackByIndex(this.internalObj, trackIndex);
    }

    changeVideoSize(videoWidth, videoHeight) {
        return Module.nvs_timeline_changeVideoSize(this.internalObj, videoWidth, videoHeight);
    }

    changeVideoSize2(videoWidth, videoHeight) {
        return Module.nvs_timeline_changeVideoSize2(this.internalObj, videoWidth, videoHeight);
    }

    getFirstCaption() {
        return Module.nvs_timeline_getFirstCaption(this.internalObj);
    }

    getLastCaption() {
        return Module.nvs_timeline_getLastCaption(this.internalObj);
    }

    getPrevCaption(caption) {
        return Module.nvs_timeline_getPrevCaption(this.internalObj, caption);
    }

    getNextCaption(caption) {
        return Module.nvs_timeline_getNextCaption(this.internalObj, caption);
    }

    getCaptionsByTimelinePosition(timelinePos) {
        return Module.nvs_timeline_getCaptionsByTimelinePosition(this.internalObj, timelinePos);
    }

    addCaption(captionText, inPoint, duration, captionStylePackageId, isPanoramic) {
        return Module.nvs_timeline_addCaption(this.internalObj, captionText, inPoint, duration, captionStylePackageId, isPanoramic);
    }

    removeCaption(caption) {
        return Module.nvs_timeline_removeCaption(this.internalObj, caption);
    }

    getFirstCompoundCaption() {
        return Module.nvs_timeline_getFirstCompoundCaption(this.internalObj);
    }

    getLastCompoundCaption() {
        return Module.nvs_timeline_getLastCompoundCaption(this.internalObj);
    }

    getPrevCompoundCaption(caption) {
        return Module.nvs_timeline_getPrevCompoundCaption(this.internalObj, caption);
    }

    getNextCompoundCaption(caption) {
        return Module.nvs_timeline_getNextCompoundCaption(this.internalObj, caption);
    }

    getCompoundCaptionsByTimelinePosition(timelinePos) {
        return Module.nvs_timeline_getCompoundCaptionsByTimelinePosition(this.internalObj, timelinePos);
    }

    addCompoundCaption(inPoint, duration, compoundCaptionPackageId) {
        return Module.nvs_timeline_addCompoundCaption(this.internalObj, inPoint, duration, compoundCaptionPackageId);
    }

    removeCompoundCaption(caption) {
        return Module.nvs_timeline_removeCompoundCaption(this.internalObj, caption);
    }

    getFirstAnimatedSticker() {
        return Module.nvs_timeline_getFirstAnimatedSticker(this.internalObj);
    }

    getLastAnimatedSticker() {
        return Module.nvs_timeline_getLastAnimatedSticker(this.internalObj);
    }

    getPrevAnimatedSticker(animatedSticker) {
        return Module.nvs_timeline_getPrevAnimatedSticker(this.internalObj, animatedSticker);
    }

    getNextAnimatedSticker(animatedSticker) {
        return Module.nvs_timeline_getNextAnimatedSticker(this.internalObj, animatedSticker);
    }

    getAnimatedStickersByTimelinePosition(timelinePos) {
        return Module.nvs_timeline_getAnimatedStickersByTimelinePosition(this.internalObj, timelinePos);
    }

    addAnimatedSticker(inPoint, duration, animatedStickerPackageId, isPanoramic, isCustom, customImagePath) {
        return Module.nvs_timeline_addAnimatedSticker(this.internalObj, inPoint, duration, animatedStickerPackageId, isPanoramic, isCustom, customImagePath);
    }

    removeAnimatedSticker(animatedSticker) {
        return Module.nvs_timeline_removeAnimatedSticker(this.internalObj, animatedSticker);
    }

    getFirstTimelineVideoFx() {
        return Module.nvs_timeline_getFirstTimelineVideoFx(this.internalObj);
    }

    getLastTimelineVideoFx() {
        return Module.nvs_timeline_getLastTimelineVideoFx(this.internalObj);
    }

    getPrevTimelineVideoFx(timelineVideoFx) {
        return Module.nvs_timeline_getPrevTimelineVideoFx(this.internalObj, timelineVideoFx);
    }

    getNextTimelineVideoFx(timelineVideoFx) {
        return Module.nvs_timeline_getNextTimelineVideoFx(this.internalObj, timelineVideoFx);
    }

    getTimelineVideoFxByTimelinePosition(timelinePos) {
        return Module.nvs_timeline_getTimelineVideoFxByTimelinePosition(this.internalObj, timelinePos);
    }

    addBuiltinTimelineVideoFx(inPoint, duration, videoFxName) {
        return Module.nvs_timeline_addBuiltinTimelineVideoFx(this.internalObj, inPoint, duration, videoFxName);
    }

    addPackagedTimelineVideoFx(inPoint, duration, videoFxPackageId) {
        return Module.nvs_timeline_addPackagedTimelineVideoFx(this.internalObj, inPoint, duration, videoFxPackageId);
    }

    removeTimelineVideoFx(timelineVideoFx) {
        return Module.nvs_timeline_removeTimelineVideoFx(this.internalObj, timelineVideoFx);
    }

    getCurrentThemeId() {
        return Module.nvs_timeline_getCurrentThemeId(this.internalObj);
    }

    applyTheme(themeId) {
        return Module.nvs_timeline_applyTheme(this.internalObj, themeId);
    }

    removeCurrentTheme() {
        Module.nvs_timeline_removeCurrentTheme(this.internalObj);
    }

    setThemeTitleCaptionText(text) {
        Module.nvs_timeline_setThemeTitleCaptionText(this.internalObj, text);
    }

    setThemeTrailerCaptionText(text) {
        Module.nvs_timeline_setThemeTrailerCaptionText(this.internalObj, text);
    }

    setThemeMusicVolumeGain(leftVolumeGain, rightVolumeGain) {
        Module.nvs_timeline_setThemeMusicVolumeGain(this.internalObj, leftVolumeGain, rightVolumeGain);
    }

    getThemeMusicVolumeGain() {
        return Module.nvs_timeline_getThemeMusicVolumeGain(this.internalObj);
    }

    setPlaybackRateControl(playbackRateControlRegions) {
        Module.nvs_timeline_setPlaybackRateControl(this.internalObj, playbackRateControlRegions);
    }

    addWatermark(filePath, displayWidth, displayHeight, opacity, position, marginX, marginY) {
        Module.nvs_timeline_addWatermark(this.internalObj, filePath, displayWidth, displayHeight, opacity, position, marginX, marginY);
    }

    deleteWatermark() {
        Module.nvs_timeline_deleteWatermark(this.internalObj);
    }

    setWatermarkOpacity(opacity) {
        Module.nvs_timeline_setWatermarkOpacity(this.internalObj, opacity);
    }
}


class NvsTrack extends NvsProjObj {
    constructor() {
        super();
    }

    getType() {
        return Module.nvs_track_getType(this.internalObj);
    }

    getIndex() {
        return Module.nvs_track_getIndex(this.internalObj);
    }

    getDuration() {
        return Module.nvs_track_getDuration(this.internalObj);
    }

    getClipCount() {
        return Module.nvs_track_getClipCount(this.internalObj);
    }

    changeInPoint(clipIndex, newInPoint) {
        return Module.nvs_track_changeInPoint(this.internalObj, clipIndex, newInPoint);
    }

    changeOutPoint(clipIndex, newOutPoint) {
        return Module.nvs_track_changeOutPoint(this.internalObj, clipIndex, newOutPoint);
    }

    splitClip(clipIndex, splitPoint) {
        return Module.nvs_track_splitClip(this.internalObj, clipIndex, splitPoint);
    }

    removeClip(clipIndex, keepSpace) {
        return Module.nvs_track_removeClip(this.internalObj, clipIndex, keepSpace);
    }

    removeRange(startTimelinePos, endTimelinePos, keepSpace) {
        return Module.nvs_track_removeRange(this.internalObj, startTimelinePos, endTimelinePos, keepSpace);
    }

    removeAllClips() {
        return Module.nvs_track_removeAllClips(this.internalObj);
    }

    setVolumeGain(leftVolumeGain, rightVolumeGain) {
        return Module.nvs_track_setVolumeGain(this.internalObj, leftVolumeGain, rightVolumeGain);
    }

    getVolumeGain() {
        return Module.nvs_track_getVolumeGain(this.internalObj);
    }
}


class NvsVideoTrack extends NvsTrack {
    constructor() {
        super();
    }

    insertClip(videoFilePath, insertPoint) {
        return Module.nvs_videoTrack_insertClip(this.internalObj, videoFilePath, insertPoint);
    }

    insertClip2(videoFilePath, trimIn, trimOut, insertPoint) {
        return Module.nvs_videoTrack_insertClip2(this.internalObj, videoFilePath, trimIn, trimOut, insertPoint);
    }

    appendClip(videoFilePath) {
        return this.insertClip(videoFilePath, this.getClipCount());
    }

    appendClip2(videoFilePath, trimIn, trimOut) {
        return this.insertClip2(videoFilePath, trimIn, trimOut, this.getClipCount());
    }

    addClip(videoFilePath, inPoint) {
        return Module.nvs_videoTrack_addClip(this.internalObj, videoFilePath, inPoint);
    }

    addClip2(videoFilePath, inPoint, trimIn, trimOut) {
        return Module.nvs_videoTrack_addClip2(this.internalObj, videoFilePath, inPoint, trimIn, trimOut);
    }

    getClipByIndex(index) {
        return Module.nvs_videoTrack_getClipByIndex(this.internalObj, index);
    }

    getClipByTimelinePosition(timelinePos) {
        return Module.nvs_videoTrack_getClipByTimelinePosition(this.internalObj, timelinePos);
    }

    setBuiltinTransition(srcClipIndex, transitionName) {
        return Module.nvs_videoTrack_setBuiltinTransition(this.internalObj, srcClipIndex, transitionName);
    }

    setPackagedTransition(srcClipIndex, packageId) {
        return Module.nvs_videoTrack_setPackagedTransition(this.internalObj, srcClipIndex, packageId);
    }

    getTransitionBySourceClipIndex(srcClipIndex) {
        return Module.nvs_videoTrack_getTransitionBySourceClipIndex(this.internalObj, srcClipIndex);
    }

    setAvailableInTheme(available) {
        return Module.nvs_videoTrack_setAvailableInTheme(this.internalObj, available);
    }

    isAvailableInTheme() {
        return Module.nvs_videoTrack_isAvailableInTheme(this.internalObj);
    }
}


class NvsAudioTrack extends NvsTrack {
    constructor() {
        super();
    }

    insertClip(audioFilePath, insertPoint) {
        return Module.nvs_audioTrack_insertClip(this.internalObj, audioFilePath, insertPoint);
    }

    insertClip2(audioFilePath, trimIn, trimOut, insertPoint) {
        return Module.nvs_audioTrack_insertClip2(this.internalObj, audioFilePath, trimIn, trimOut, insertPoint);
    }

    appendClip(audioFilePath) {
        return this.insertClip(audioFilePath, this.getClipCount());
    }

    appendClip2(audioFilePath, trimIn, trimOut) {
        return this.insertClip2(audioFilePath, trimIn, trimOut, this.getClipCount());
    }

    addClip(audioFilePath, inPoint) {
        return Module.nvs_audioTrack_addClip(this.internalObj, audioFilePath, inPoint);
    }

    addClip2(audioFilePath, inPoint, trimIn, trimOut) {
        return Module.nvs_audioTrack_addClip2(this.internalObj, audioFilePath, inPoint, trimIn, trimOut);
    }

    getClipByIndex(index) {
        return Module.nvs_audioTrack_getClipByIndex(this.internalObj, index);
    }

    getClipByTimelinePosition(timelinePos) {
        return Module.nvs_audioTrack_getClipByTimelinePosition(this.internalObj, timelinePos);
    }

    setBuiltinTransition(srcClipIndex, transitionName) {
        return Module.nvs_audioTrack_setBuiltinTransition(this.internalObj, srcClipIndex, transitionName);
    }

    getTransitionBySourceClipIndex(srcClipIndex) {
        return Module.nvs_audioTrack_getTransitionBySourceClipIndex(this.internalObj, srcClipIndex);
    }
}


class NvsClip extends NvsProjObj {
    constructor() {
        super();
    }

    getTrimIn() {
        return Module.nvs_clip_getTrimIn(this.internalObj);
    }

    getTrimOut() {
        return Module.nvs_clip_getTrimOut(this.internalObj);
    }

    getInPoint() {
        return Module.nvs_clip_getInPoint(this.internalObj);
    }

    getOutPoint() {
        return Module.nvs_clip_getOutPoint(this.internalObj);
    }

    getType() {
        return Module.nvs_clip_getType(this.internalObj);
    }

    getIndex() {
        return Module.nvs_clip_getIndex(this.internalObj);
    }

    getFilePath() {
        return Module.nvs_clip_getFilePath(this.internalObj);
    }

    getFxCount() {
        return Module.nvs_clip_getFxCount(this.internalObj);
    }

    changeTrimInPoint(newTrimInPoint, affectSibling) {
        return Module.nvs_clip_changeTrimInPoint(this.internalObj, newTrimInPoint, affectSibling);
    }

    changeTrimOutPoint(newTrimOutPoint, affectSibling) {
        return Module.nvs_clip_changeTrimOutPoint(this.internalObj, newTrimOutPoint, affectSibling);
    }

    getSpeed() {
        return Module.nvs_clip_getSpeed(this.internalObj);
    }

    changeSpeed(newSpeed, keepAudioPitch) {
        Module.nvs_clip_changeSpeed(this.internalObj, newSpeed, keepAudioPitch);
    }

    getVolumeGain() {
        return Module.nvs_clip_getVolumeGain(this.internalObj);
    }

    setVolumeGain(leftVolumeGain, rightVolumeGain) {
        Module.nvs_clip_setVolumeGain(this.internalObj, leftVolumeGain, rightVolumeGain);
    }

    setFadeInDuration(duration) {
        Module.nvs_clip_setFadeInDuration(this.internalObj, duration);
    }

    getFadeInDuration() {
        return Module.nvs_clip_getFadeInDuration(this.internalObj);
    }

    setFadeOutDuration(duration) {
        Module.nvs_clip_setFadeOutDuration(this.internalObj, duration);
    }

    getFadeOutDuration() {
        return Module.nvs_clip_getFadeOutDuration(this.internalObj);
    }

    changeCurvesVariableSpeed(curvesString, keepAudioPitch) {
        return Module.nvs_clip_changeCurvesVariableSpeed(this.internalObj, curvesString, keepAudioPitch);
    }

    getClipVariableSpeedCurvesString() {
        return Module.nvs_clip_getClipVariableSpeedCurvesString(this.internalObj);
    }

    getClipPosByTimelinePosCurvesVariableSpeed(timelinePos) {
        return Module.nvs_clip_getClipPosByTimelinePosCurvesVariableSpeed(this.internalObj, timelinePos);
    }

    getTimelinePosByClipPosCurvesVariableSpeed(clipPos) {
        return Module.nvs_clip_getTimelinePosByClipPosCurvesVariableSpeed(this.internalObj, clipPos);
    }
}


class NvsVideoClip extends NvsClip {
    constructor() {
        super();
    }

    appendBuiltinFx(fxName) {
        return Module.nvs_videoClip_appendBuiltinFx(this.internalObj, fxName);
    }

    insertBuiltinFx(fxName, fxIndex) {
        return Module.nvs_videoClip_insertBuiltinFx(this.internalObj, fxName, fxIndex);
    }

    appendPackagedFx(fxPackageId) {
        return Module.nvs_videoClip_appendPackagedFx(this.internalObj, fxPackageId);
    }

    insertPackagedFx(fxPackageId, fxIndex) {
        return Module.nvs_videoClip_insertPackagedFx(this.internalObj, fxPackageId, fxIndex);
    }

    removeFx(fxIndex) {
        return Module.nvs_videoClip_removeFx(this.internalObj, fxIndex);
    }

    removeAllFx() {
        return Module.nvs_videoClip_removeAllFx(this.internalObj);
    }

    getFxByIndex(fxIndex) {
        return Module.nvs_videoClip_getFxByIndex(this.internalObj, fxIndex);
    }

    getVideoType() {
        return Module.nvs_videoClip_getVideoType(this.internalObj);
    }

    getRoleInTheme() {
        return Module.nvs_videoClip_getRoleInTheme(this.internalObj);
    }

    setPlayInReverse(playInReverse) {
        Module.nvs_videoClip_setPlayInReverse(this.internalObj, playInReverse);
    }

    getPlayInReverse() {
        return Module.nvs_videoClip_getPlayInReverse(this.internalObj);
    }

    setExtraVideoRotation(rotation) {
        Module.nvs_videoClip_setExtraVideoRotation(this.internalObj, rotation);
    }

    getExtraVideoRotation() {
        return Module.nvs_videoClip_getExtraVideoRotation(this.internalObj);
    }

    setPanAndScan(pan, scan) {
        Module.nvs_videoClip_setPanAndScan(this.internalObj, pan, scan);
    }

    getPanAndScan() {
        return Module.nvs_videoClip_getPanAndScan(this.internalObj);
    }

    setSourceBackgroundMode(mode) {
        Module.nvs_videoClip_setSourceBackgroundMode(this.internalObj, mode);
    }

    getSourceBackgroundMode() {
        return Module.nvs_videoClip_getSourceBackgroundMode(this.internalObj);
    }

    setSourceBackgroundColor(color) {
        Module.nvs_videoClip_setSourceBackgroundColor(this.internalObj, color);
    }

    getSourceBackgroundColor() {
        return Module.nvs_videoClip_getSourceBackgroundColor(this.internalObj);
    }

    setImageMotionMode(mode) {
        Module.nvs_videoClip_setImageMotionMode(this.internalObj, mode);
    }

    getImageMotionMode() {
        return Module.nvs_videoClip_getImageMotionMode(this.internalObj);
    }

    setImageMotionAnimationEnabled(enabled) {
        Module.nvs_videoClip_setImageMotionAnimationEnabled(this.internalObj, enabled);
    }

    isImageMotionAnimationEnabled() {
        return Module.nvs_videoClip_isImageMotionAnimationEnabled(this.internalObj);
    }

    setClipWrapMode(wrapMode) {
        Module.nvs_videoClip_setClipWrapMode(this.internalObj, wrapMode);
    }

    getClipWrapMode() {
        return Module.nvs_videoClip_getClipWrapMode(this.internalObj);
    }

    enableClipFreezeFrame(enabled) {
        Module.nvs_videoClip_enableClipFreezeFrame(this.internalObj, enabled);
    }

    isClipFreezeFrameEnabled() {
        return Module.nvs_videoClip_isClipFreezeFrameEnabled(this.internalObj);
    }

    setClipFreezeFrameTrimPosition(trimPos) {
        Module.nvs_videoClip_setClipFreezeFrameTrimPosition(this.internalObj, trimPos);
    }

    getClipFreezeFrameTrimPosition() {
        return Module.nvs_videoClip_getClipFreezeFrameTrimPosition(this.internalObj);
    }
}


class NvsAudioClip extends NvsClip {
    constructor() {
        super();
    }

    appendFx(fxName) {
        return Module.nvs_audioClip_appendFx(this.internalObj, fxName);
    }

    insertFx(fxName, fxIndex) {
        return Module.nvs_audioClip_insertFx(this.internalObj, fxName, fxIndex);
    }

    removeFx(fxIndex) {
        return Module.nvs_audioClip_removeFx(this.internalObj, fxIndex);
    }

    getFxByIndex(fxIndex) {
        return Module.nvs_audioClip_getFxByIndex(this.internalObj, fxIndex);
    }
}

class NvsPanAndScan {
    constructor(pan, scan) {
        this.pan = pan;
        this.scan = scan;
    }
}

class NvsVolume {
    constructor(leftVolume, rightVolume) {
        this.leftVolume = leftVolume;
        this.rightVolume = rightVolume;
    }
}

class NvsColor {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}

class NvsPointF {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class NvsRectF {
    constructor(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
}

class NvsAssetPackageManager {
    constructor() {
        this.internalObj = 0;
        this.onFinishAssetPackageInstallation = function(assetPackageId, assetPackageFilePath, assetPackageType, error) {
        }
    }

    setInternalObject(obj) {
        this.internalObj = obj;
    }

    getInternalObject() {
        return this.internalObj;
    }

    installAssetPackage(assetPackageFilePath, licenseFilePath, type) {
        return Module.nvs_assetPackageManager_installAssetPackage(assetPackageFilePath, licenseFilePath, type);
    }

    uninstallAssetPackage(assetPackageId, type) {
        return Module.nvs_assetPackageManager_uninstallAssetPackage(assetPackageId, type);
    }

    getAssetPackageStatus(assetPackageId, type) {
        return Module.nvs_assetPackageManager_getAssetPackageStatus(assetPackageId, type);
    }

    isParticleFX(uuidString) {
        return Module.nvs_assetPackageManager_isParticleFX(uuidString);
    }

    getVideoFxAssetPackageDescription(uuidString) {
        return Module.nvs_assetPackageManager_getVideoFxAssetPackageDescription(uuidString);
    }
}

class NvsFx extends NvsProjObj {
    constructor() {
        super();
    }

    getDescription() {
        return Module.nvs_fx_getDescription(this.internalObj);
    }

    setIntVal(fxParam, val) {
        Module.nvs_fx_setIntVal(this.internalObj, fxParam, val);
    }

    getIntVal(fxParam) {
        return Module.nvs_fx_getIntVal(this.internalObj, fxParam);
    }

    setIntValAtTime(fxParam, val, time) {
        Module.nvs_fx_setIntValAtTime(this.internalObj, fxParam, val, time);
    }

    getIntValAtTime(fxParam, time) {
        return Module.nvs_fx_getIntValAtTime(this.internalObj, fxParam, time);
    }

    setFloatVal(fxParam, val) {
        Module.nvs_fx_setFloatVal(this.internalObj, fxParam, val);
    }

    getFloatVal(fxParam) {
        return Module.nvs_fx_getFloatVal(this.internalObj, fxParam);
    }

    setFloatValAtTime(fxParam, val, time) {
        Module.nvs_fx_setFloatValAtTime(this.internalObj, fxParam, val, time);
    }

    getFloatValAtTime(fxParam, time) {
        return Module.nvs_fx_getFloatValAtTime(this.internalObj, fxParam, time);
    }

    setBooleanVal(fxParam, val) {
        Module.nvs_fx_setBooleanVal(this.internalObj, fxParam, val);
    }

    getBooleanVal(fxParam) {
        return Module.nvs_fx_getBooleanVal(this.internalObj, fxParam);
    }

    setBooleanValAtTime(fxParam, val, time) {
        Module.nvs_fx_setBooleanValAtTime(this.internalObj, fxParam, val, time);
    }

    getBooleanValAtTime(fxParam, time) {
        return Module.nvs_fx_getBooleanValAtTime(this.internalObj, fxParam, time);
    }

    setStringVal(fxParam, val) {
        Module.nvs_fx_setStringVal(this.internalObj, fxParam, val);
    }

    getStringVal(fxParam) {
        return Module.nvs_fx_getStringVal(this.internalObj, fxParam);
    }

    setStringValAtTime(fxParam, val, time) {
        Module.nvs_fx_setStringValAtTime(this.internalObj, fxParam, val, time);
    }

    getStringValAtTime(fxParam, time) {
        return Module.nvs_fx_getStringValAtTime(this.internalObj, fxParam, time);
    }

    setColorVal(fxParam, val) {
        Module.nvs_fx_setColorVal(this.internalObj, fxParam, val);
    }

    getColorVal(fxParam) {
        return Module.nvs_fx_getColorVal(this.internalObj, fxParam);
    }

    setColorValAtTime(fxParam, val, time) {
        Module.nvs_fx_setColorValAtTime(this.internalObj, fxParam, val, time);
    }

    getColorValAtTime(fxParam, time) {
        return Module.nvs_fx_getColorValAtTime(this.internalObj, fxParam, time);
    }

    removeKeyframeAtTime(fxParam, time) {
        return Module.nvs_fx_removeKeyframeAtTime(this.internalObj, fxParam, time);
    }

    removeAllKeyframe(fxParam) {
        return Module.nvs_fx_removeAllKeyframe(this.internalObj, fxParam);
    }

    hasKeyframeList(fxParam) {
        return Module.nvs_fx_hasKeyframeList(this.internalObj, fxParam);
    }

    findKeyframeTime(fxParam, time, flags) {
        return Module.nvs_fx_findKeyframeTime(this.internalObj, fxParam, time, flags);
    }

    setFilterIntensity(intensity) {
        Module.nvs_fx_setFilterIntensity(this.internalObj, intensity);
    }

    getFilterIntensity() {
        return Module.nvs_fx_getFilterIntensity(this.internalObj);
    }

    setRegional(isRegional) {
        Module.nvs_fx_setRegional(this.internalObj, isRegional);
    }

    getRegional() {
        return Module.nvs_fx_getRegional(this.internalObj);
    }

    setIgnoreBackground(isIgnoreBackground) {
        Module.nvs_fx_setIgnoreBackground(this.internalObj, isIgnoreBackground);
    }

    getIgnoreBackground() {
        return Module.nvs_fx_getIgnoreBackground(this.internalObj);
    }

    setInverseRegion(isInverseRegion) {
        Module.nvs_fx_setInverseRegion(this.internalObj, isInverseRegion);
    }

    getInverseRegion() {
        return Module.nvs_fx_getInverseRegion(this.internalObj);
    }

    setRegion(region) {
        Module.nvs_fx_setRegion(this.internalObj, region);
    }

    setRegionAtTime(region, time) {
        Module.nvs_fx_setRegionAtTime(this.internalObj, region, time);
    }

    setEllipseRegion(center, a, b, angle) {
        Module.nvs_fx_setEllipseRegion(this.internalObj, center, a, b, angle);
    }

    setEllipseRegionAtTime(center, a, b, angle, time) {
        Module.nvs_fx_setEllipseRegionAtTime(this.internalObj, center, a, b, angle, time);
    }

    setRegionalFeatherWidth(featherWidth) {
        Module.nvs_fx_setRegionalFeatherWidth(this.internalObj, featherWidth);
    }

    getRegionalFeatherWidth() {
        return Module.nvs_fx_getRegionalFeatherWidth(this.internalObj);
    }

    getParticleSystemContext() {
        return Module.nvs_fx_getParticleSystemContext(this.internalObj);
    }

    getARSceneManipulate() {
        return Module.nvs_fx_getARSceneManipulate(this.internalObj);
    }

    setExprVar(varName, varValue) {
        Module.nvs_fx_setExprVar(this.internalObj, varName, varValue);
    }

    getExprVar(varName) {
        return Module.nvs_fx_getExprVar(this.internalObj, varName);
    }

    clearExprVar() {
        Module.nvs_fx_clearExprVar(this.internalObj);
    }

    clearExprVarCtx() {
        Module.nvs_fx_clearExprVarCtx(this.internalObj);
    }
}

class NvsTimelineVideoFx extends NvsFx {
    constructor() {
        super();
    }

    getTimelineVideoFxType() {
        return Module.nvs_timelineVideoFx_getTimelineVideoFxType(this.internalObj);
    }

    getBuiltinTimelineVideoFxName() {
        return Module.nvs_timelineVideoFx_getBuiltinTimelineVideoFxName(this.internalObj);
    }

    getTimelineVideoFxPackageId() {
        return Module.nvs_timelineVideoFx_getTimelineVideoFxPackageId(this.internalObj);
    }

    getInPoint() {
        return Module.nvs_timelineVideoFx_getInPoint(this.internalObj);
    }

    getOutPoint() {
        return Module.nvs_timelineVideoFx_getOutPoint(this.internalObj);
    }

    changeInPoint(newInPoint) {
        return Module.nvs_timelineVideoFx_changeInPoint(this.internalObj, newInPoint);
    }

    changeOutPoint(newOutPoint) {
        return Module.nvs_timelineVideoFx_changeOutPoint(this.internalObj, newOutPoint);
    }

    movePosition(offset) {
        Module.nvs_timelineVideoFx_movePosition(this.internalObj, offset);
    }

    setZValue(value) {
        Module.nvs_timelineVideoFx_setZValue(this.internalObj, value);
    }

    getZValue() {
        return Module.nvs_timelineVideoFx_getZValue(this.internalObj);
    }

    mapPointFromCanonicalToParticleSystem(ptCanonical) {
        return Module.nvs_timelineVideoFx_mapPointFromCanonicalToParticleSystem(this.internalObj, ptCanonical);
    }
}

class NvsTimelineCaption extends NvsFx {
    constructor() {
        super();
    }

    getInPoint() {
        return Module.nvs_caption_getInPoint(this.internalObj);
    }

    getOutPoint() {
        return Module.nvs_caption_getOutPoint(this.internalObj);
    }

    changeInPoint(newInPoint) {
        return Module.nvs_caption_changeInPoint(this.internalObj, newInPoint);
    }

    changeOutPoint(newOutPoint) {
        return Module.nvs_caption_changeOutPoint(this.internalObj, newOutPoint);
    }

    movePosition(offset) {
        Module.nvs_caption_movePosition(this.internalObj, offset);
    }

    getRoleInTheme() {
        return Module.nvs_caption_getRoleInTheme(this.internalObj);
    }

    getCategory() {
        return Module.nvs_caption_getCategory(this.internalObj);
    }

    getCaptionStylePackageId() {
        return Module.nvs_caption_getCaptionStylePackageId(this.internalObj);
    }

    getModularCaptionContextPackageId() {
        return Module.nvs_caption_getModularCaptionContextPackageId(this.internalObj);
    }

    getModularCaptionRendererPackageId() {
        return Module.nvs_caption_getModularCaptionRendererPackageId(this.internalObj);
    }

    getModularCaptionAnimationPackageId() {
        return Module.nvs_caption_getModularCaptionAnimationPackageId(this.internalObj);
    }

    getModularCaptionInAnimationPackageId() {
        return Module.nvs_caption_getModularCaptionInAnimationPackageId(this.internalObj);
    }

    getModularCaptionOutAnimationPackageId() {
        return Module.nvs_caption_getModularCaptionOutAnimationPackageId(this.internalObj);
    }

    applyCaptionStyle(captionStylePackageId, isUseDefaultAssetParam) {
        Module.nvs_caption_applyCaptionStyle(this.internalObj, captionStylePackageId, isUseDefaultAssetParam);
    }

    applyModularCaptionContext(captionContextPackageId) {
        Module.nvs_caption_applyModularCaptionContext(this.internalObj, captionContextPackageId);
    }

    applyModularCaptionRenderer(captionRendererPackageId) {
        Module.nvs_caption_applyModularCaptionRenderer(this.internalObj, captionRendererPackageId);
    }

    applyModularCaptionAnimation(captionAnimationPackageId) {
        Module.nvs_caption_applyModularCaptionAnimation(this.internalObj, captionAnimationPackageId);
    }

    applyModularCaptionInAnimation(captionInAnimationPackageId) {
        Module.nvs_caption_applyModularCaptionInAnimation(this.internalObj, captionInAnimationPackageId);
    }

    applyModularCaptionOutAnimation(captionOutAnimationPackageId) {
        Module.nvs_caption_applyModularCaptionOutAnimation(this.internalObj, captionOutAnimationPackageId);
    }

    setModularCaptionAnimationPeroid(periodInMS) {
        Module.nvs_caption_setModularCaptionAnimationPeroid(this.internalObj, periodInMS);
    }

    getModularCaptionAnimationPeroid() {
        return Module.nvs_caption_getModularCaptionAnimationPeroid(this.internalObj);
    }

    setModularCaptionInAnimationDuration(inAnimationDurationInMS) {
        Module.nvs_caption_setModularCaptionInAnimationDuration(this.internalObj, inAnimationDurationInMS);
    }

    getModularCaptionInAnimationDuration() {
        return Module.nvs_caption_getModularCaptionInAnimationDuration(this.internalObj);
    }

    setModularCaptionOutAnimationDuration(outAnimationDurationInMS) {
        Module.nvs_caption_setModularCaptionOutAnimationDuration(this.internalObj, outAnimationDurationInMS);
    }

    getModularCaptionOutAnimationDuration() {
        return Module.nvs_caption_getModularCaptionOutAnimationDuration(this.internalObj);
    }

    setText(text) {
        Module.nvs_caption_setText(this.internalObj, text);
    }

    getText() {
        return Module.nvs_caption_getText(this.internalObj);
    }

    setTextAlignment(textAlign) {
        Module.nvs_caption_setTextAlignment(this.internalObj, textAlign);
    }

    getTextAlignment() {
        return Module.nvs_caption_getTextAlignment(this.internalObj);
    }

    setBold(bold) {
        Module.nvs_caption_setBold(this.internalObj, bold);
    }

    getBold() {
        return Module.nvs_caption_getBold(this.internalObj);
    }

    setItalic(italic) {
        Module.nvs_caption_setItalic(this.internalObj, italic);
    }

    getItalic() {
        return Module.nvs_caption_getItalic(this.internalObj);
    }

    setLetterSpacingType(letterSpacingType) {
        Module.nvs_caption_setLetterSpacingType(this.internalObj, letterSpacingType);
    }

    getLetterSpacingType() {
        return Module.nvs_caption_getLetterSpacingType(this.internalObj);
    }

    setLetterSpacing(letterSpacing) {
        Module.nvs_caption_setLetterSpacing(this.internalObj, letterSpacing);
    }

    getLetterSpacing() {
        return Module.nvs_caption_getLetterSpacing(this.internalObj);
    }

    setLineSpacing(lineSpacing) {
        Module.nvs_caption_setLineSpacing(this.internalObj, lineSpacing);
    }

    getLineSpacing() {
        return Module.nvs_caption_getLineSpacing(this.internalObj);
    }

    setWeight(weight) {
        Module.nvs_caption_setWeight(this.internalObj, weight);
    }

    getWeight() {
        return Module.nvs_caption_getWeight(this.internalObj);
    }

    setTextColor(color) {
        if (color === undefined || color === null || color === '')
            return;
        Module.nvs_caption_setTextColor(this.internalObj, color);
    }

    getTextColor() {
        return Module.nvs_caption_getTextColor(this.internalObj);
    }

    setDrawOutline(drawOutline) {
        Module.nvs_caption_setDrawOutline(this.internalObj, drawOutline);
    }

    getDrawOutline() {
        return Module.nvs_caption_getDrawOutline(this.internalObj);
    }

    setOutlineWidth(outlineWidth) {
        Module.nvs_caption_setOutlineWidth(this.internalObj, outlineWidth);
    }

    getOutlineWidth() {
        return Module.nvs_caption_getOutlineWidth(this.internalObj);
    }

    setOutlineColor(color) {
        if (color === undefined || color === null || color === '')
            return;
        Module.nvs_caption_setOutlineColor(this.internalObj, color);
    }

    getOutlineColor() {
        return Module.nvs_caption_getOutlineColor(this.internalObj);
    }

    setDrawShadow(drawShadow) {
        Module.nvs_caption_setDrawShadow(this.internalObj, drawShadow);
    }

    getDrawShadow() {
        return Module.nvs_caption_getDrawShadow(this.internalObj);
    }

    setShadowOffset(offset) {
        Module.nvs_caption_setShadowOffset(this.internalObj, offset);
    }

    getShadowOffset() {
        return Module.nvs_caption_getShadowOffset(this.internalObj);
    }

    setShadowColor(color) {
        if (color === undefined || color === null || color === '')
            return;
        Module.nvs_caption_setShadowColor(this.internalObj, color);
    }

    getShadowColor() {
        return Module.nvs_caption_getShadowColor(this.internalObj);
    }

    setShadowFeather(feather) {
        Module.nvs_caption_setShadowFeather(this.internalObj, feather);
    }

    getShadowFeather() {
        return Module.nvs_caption_getShadowFeather(this.internalObj);
    }

    setFontSize(fontSize) {
        Module.nvs_caption_setFontSize(this.internalObj, fontSize);
    }

    getFontSize() {
        return Module.nvs_caption_getFontSize(this.internalObj);
    }

    setFontByFilePath(filePath) {
        Module.nvs_caption_setFontByFilePath(this.internalObj, filePath);
    }

    getFontFilePath() {
        return Module.nvs_caption_getFontFilePath(this.internalObj);
    }

    setFontFamily(family) {
        Module.nvs_caption_setFontFamily(this.internalObj, family);
    }

    getFontFamily() {
        return Module.nvs_caption_getFontFamily(this.internalObj);
    }

    setCaptionTranslation(translation) {
        Module.nvs_caption_setCaptionTranslation(this.internalObj, translation);
    }

    getCaptionTranslation() {
        return Module.nvs_caption_getCaptionTranslation(this.internalObj);
    }

    translateCaption(translationOffset) {
        Module.nvs_caption_translateCaption(this.internalObj, translationOffset);
    }

    setAnchorPoint(anchor) {
        Module.nvs_caption_setAnchorPoint(this.internalObj, anchor);
    }

    getAnchorPoint() {
        return Module.nvs_caption_getAnchorPoint(this.internalObj);
    }

    setScaleX(scale) {
        Module.nvs_caption_setScaleX(this.internalObj, scale);
    }

    getScaleX() {
        return Module.nvs_caption_getScaleX(this.internalObj);
    }

    setScaleY(scale) {
        Module.nvs_caption_setScaleY(this.internalObj, scale);
    }

    getScaleY() {
        return Module.nvs_caption_getScaleY(this.internalObj);
    }

    scaleCaption(scaleFactor, anchor) {
        Module.nvs_caption_scaleCaption(this.internalObj, scaleFactor, anchor);
    }

    scaleCaption2(scaleFactor) {
        var rect = this.getTextBoundingRect();
        this.scaleCaption(scaleFactor, new NvsPointF((rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2));
    }

    setRotationZ(angle) {
        Module.nvs_caption_setRotationZ(this.internalObj, angle);
    }

    getRotationZ() {
        return Module.nvs_caption_getRotationZ(this.internalObj);
    }

    rotateCaption(angle, anchor) {
        Module.nvs_caption_rotateCaption(this.internalObj, angle, anchor);
    }

    rotateCaption2(angle) {
        var rect = this.getTextBoundingRect();
        this.rotateCaption(angle, new NvsPointF((rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2));
    }

    getTextBoundingRect() {
        return Module.nvs_caption_getTextBoundingRect(this.internalObj);
    }

    getBoundingRectangleVertices() {
        return Module.nvs_caption_getBoundingRectangleVertices(this.internalObj);
    }

    getCaptionBoundingVertices(boundingType) {
        return Module.nvs_caption_getCaptionBoundingVertices(this.internalObj, boundingType);
    }

    setZValue(value) {
        Module.nvs_caption_setZValue(this.internalObj, value);
    }

    getZValue() {
        return Module.nvs_caption_getZValue(this.internalObj);
    }

    isFrameCaption() {
        return Module.nvs_caption_isFrameCaption(this.internalObj);
    }

    isModular() {
        return Module.nvs_caption_isModular(this.internalObj);
    }

    setBackgroundColor(backgroundColor) {
        Module.nvs_caption_setBackgroundColor(this.internalObj, backgroundColor);
    }

    getBackgroundColor() {
        return Module.nvs_caption_getBackgroundColor(this.internalObj);
    }

    setBackgroundRadius(radius) {
        Module.nvs_caption_setBackgroundRadius(this.internalObj, radius);
    }

    getBackgroundRadius() {
        return Module.nvs_caption_getBackgroundRadius(this.internalObj);
    }

    setCurrentKeyFrameTime(time) {
        Module.nvs_caption_setCurrentKeyFrameTime(this.internalObj, time);
    }
}


class NvsMotionParameters {
    constructor() {
        this.anchorX = 0;
        this.anchorY = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotationZ = 0;
        this.transX = 0;
        this.transY = 0;
    }
}

class NvsTimelineCompoundCaption extends NvsFx {
    constructor() {
        super();
    }

    getCaptionCount() {
        return Module.nvs_compoundCaption_getCaptionCount(this.internalObj);
    }

    getInPoint() {
        return Module.nvs_compoundCaption_getInPoint(this.internalObj);
    }

    getOutPoint() {
        return Module.nvs_compoundCaption_getOutPoint(this.internalObj);
    }

    changeInPoint(newInPoint) {
        return Module.nvs_compoundCaption_changeInPoint(this.internalObj, newInPoint);
    }

    changeOutPoint(newOutPoint) {
        return Module.nvs_compoundCaption_changeOutPoint(this.internalObj, newOutPoint);
    }

    movePosition(offset) {
        Module.nvs_compoundCaption_movePosition(this.internalObj, offset);
    }

    setText(captionIndex, text) {
        Module.nvs_compoundCaption_setText(this.internalObj, captionIndex, text);
    }

    getText(captionIndex) {
        return Module.nvs_compoundCaption_getText(this.internalObj, captionIndex);
    }

    setTextColor(captionIndex, color) {
        if (color === undefined || color === null || color === '')
            return;
        Module.nvs_compoundCaption_setTextColor(this.internalObj, captionIndex, color);
    }

    getTextColor(captionIndex) {
        return Module.nvs_compoundCaption_getTextColor(this.internalObj, captionIndex);
    }

    setFontFamily(captionIndex, family) {
        Module.nvs_compoundCaption_setFontFamily(this.internalObj, captionIndex, family);
    }

    getFontFamily(captionIndex) {
        return Module.nvs_compoundCaption_getFontFamily(this.internalObj, captionIndex);
    }

    setCaptionTranslation(translation) {
        Module.nvs_compoundCaption_setCaptionTranslation(this.internalObj, translation);
    }

    getCaptionTranslation() {
        return Module.nvs_compoundCaption_getCaptionTranslation(this.internalObj);
    }

    translateCaption(translationOffset) {
        Module.nvs_compoundCaption_translateCaption(this.internalObj, translationOffset);
    }

    setAnchorPoint(anchor) {
        Module.nvs_compoundCaption_setAnchorPoint(this.internalObj, anchor);
    }

    getAnchorPoint() {
        return Module.nvs_compoundCaption_getAnchorPoint(this.internalObj);
    }

    setScaleX(scale) {
        Module.nvs_compoundCaption_setScaleX(this.internalObj, scale);
    }

    getScaleX() {
        return Module.nvs_compoundCaption_getScaleX(this.internalObj);
    }

    setScaleY(scale) {
        Module.nvs_compoundCaption_setScaleY(this.internalObj, scale);
    }

    getScaleY() {
        return Module.nvs_compoundCaption_getScaleY(this.internalObj);
    }

    scaleCaption(scaleFactor, anchor) {
        Module.nvs_compoundCaption_scaleCaption(this.internalObj, scaleFactor, anchor);
    }

    setRotationZ(angle) {
        Module.nvs_compoundCaption_setRotationZ(this.internalObj, angle);
    }

    getRotationZ() {
        return Module.nvs_compoundCaption_getRotationZ(this.internalObj);
    }

    rotateCaption(angle, anchor) {
        Module.nvs_compoundCaption_rotateCaption(this.internalObj, angle, anchor);
    }

    getCaptionBoundingVertices(captionIndex, boudingType, motionParams) {
        return Module.nvs_compoundCaption_getCaptionBoundingVertices(this.internalObj, captionIndex, boudingType, motionParams);
    }

    getCompoundBoundingVertices(boudingType, motionParams) {
        return Module.nvs_compoundCaption_getCompoundBoundingVertices(this.internalObj, boudingType, motionParams);
    }

    setZValue(value) {
        Module.nvs_compoundCaption_setZValue(this.internalObj, value);
    }

    getZValue() {
        return Module.nvs_compoundCaption_getZValue(this.internalObj);
    }

    setOpacity(value) {
        Module.nvs_compoundCaption_setOpacity(this.internalObj, value);
    }

    getOpacity() {
        return Module.nvs_compoundCaption_getOpacity(this.internalObj);
    }

    isFrameCaption(captionIndex) {
        return Module.nvs_compoundCaption_isFrameCaption(this.internalObj, captionIndex);
    }
}

class NvsTimelineAnimatedSticker extends NvsFx {
    constructor() {
        super();
    }

    getInPoint() {
        return Module.nvs_animatedSticker_getInPoint(this.internalObj);
    }

    getOutPoint() {
        return Module.nvs_animatedSticker_getOutPoint(this.internalObj);
    }

    changeInPoint(newInPoint) {
        return Module.nvs_animatedSticker_changeInPoint(this.internalObj, newInPoint);
    }

    changeOutPoint(newOutPoint) {
        return Module.nvs_animatedSticker_changeOutPoint(this.internalObj, newOutPoint);
    }

    movePosition(offset) {
        Module.nvs_animatedSticker_movePosition(this.internalObj, offset);
    }

    setTranslation(translation) {
        Module.nvs_animatedSticker_setTranslation(this.internalObj, translation);
    }

    getTranslation() {
        return Module.nvs_animatedSticker_getTranslation(this.internalObj);
    }

    translateAnimatedSticker(translationOffset) {
        Module.nvs_animatedSticker_translateAnimatedSticker(this.internalObj, translationOffset);
    }

    setScale(scale) {
        Module.nvs_animatedSticker_setScale(this.internalObj, scale);
    }

    getScale() {
        return Module.nvs_animatedSticker_getScale(this.internalObj);
    }

    scaleAnimatedSticker(scaleFactor, anchor) {
        Module.nvs_animatedSticker_scaleAnimatedSticker(this.internalObj, scaleFactor, anchor);
    }

    scaleAnimatedSticker2(scaleFactor) {
        var left, right, top, bottom;
        var list = this.getBoundingRectangleVertices();
        var point = list.get(0);
        left = right = point.x;
        top = bottom = point.y;
        for (var i = 1; i < 4; i++) {
            point = list.get(i);
            if (point.x < left)
                left = point.x;
            else if (point.x > right)
                right = point.x;
            if (point.y < bottom)
                bottom = point.y;
            else if (point.y > top)
                top = point.y;
        }
        this.scaleAnimatedSticker(scaleFactor, new NvsPointF((left + right) / 2, (top + bottom) / 2));
    }

    setRotationZ(angle) {
        Module.nvs_animatedSticker_setRotationZ(this.internalObj, angle);
    }

    getRotationZ() {
        return Module.nvs_animatedSticker_getRotationZ(this.internalObj);
    }

    rotateAnimatedSticker(angle, anchor) {
        Module.nvs_animatedSticker_rotateAnimatedSticker(this.internalObj, angle, anchor);
    }

    rotateAnimatedSticker2(angle) {
        var left, right, top, bottom;
        var list = this.getBoundingRectangleVertices();
        var point = list.get(0);
        left = right = point.x;
        top = bottom = point.y;
        for (var i = 1; i < 4; i++) {
            point = list.get(i);
            if (point.x < left)
                left = point.x;
            else if (point.x > right)
                right = point.x;
            if (point.y < bottom)
                bottom = point.y;
            else if (point.y > top)
                top = point.y;
        }
        this.rotateAnimatedSticker(angle, new NvsPointF((left + right) / 2, (top + bottom) / 2));
    }

    setHorizontalFlip(flip) {
        Module.nvs_animatedSticker_setHorizontalFlip(this.internalObj, flip);
    }

    getHorizontalFlip() {
        return Module.nvs_animatedSticker_getHorizontalFlip(this.internalObj);
    }

    setVerticalFlip(flip) {
        Module.nvs_animatedSticker_setVerticalFlip(this.internalObj, flip);
    }

    getVerticalFlip() {
        return Module.nvs_animatedSticker_getVerticalFlip(this.internalObj);
    }

    getBoundingRectangleVertices() {
        return Module.nvs_animatedSticker_getBoundingRectangleVertices(this.internalObj);
    }

    getAnimatedStickerPackageId() {
        return Module.nvs_animatedSticker_getAnimatedStickerPackageId(this.internalObj);
    }

    setZValue(value) {
        Module.nvs_animatedSticker_setZValue(this.internalObj, value);
    }

    getZValue() {
        return Module.nvs_animatedSticker_getZValue(this.internalObj);
    }

    hasAudio() {
        return Module.nvs_animatedSticker_hasAudio(this.internalObj);
    }

    setVolumeGain(leftVolumeGain, rightVolumeGain) {
        Module.nvs_animatedSticker_setVolumeGain(this.internalObj, leftVolumeGain, rightVolumeGain);
    }

    getVolumeGain() {
        return Module.nvs_animatedSticker_getVolumeGain(this.internalObj);
    }

    setOpacity(opacity) {
        Module.nvs_animatedSticker_setOpacity(this.internalObj, opacity);
    }

    getOpacity() {
        return Module.nvs_animatedSticker_getOpacity(this.internalObj);
    }

    setCurrentKeyFrameTime(time) {
        Module.nvs_animatedSticker_setCurrentKeyFrameTime(this.internalObj, time);
    }
}

class NvsVideoTransition extends NvsFx {
    constructor() {
        super();
    }

    getVideoTransitionType() {
        return Module.nvs_videoTransition_getVideoTransitionType(this.internalObj);
    }

    getBuiltinVideoTransitionName() {
        return Module.nvs_videoTransition_getBuiltinVideoTransitionName(this.internalObj);
    }

    getVideoTransitionPackageId() {
        return Module.nvs_videoTransition_getVideoTransitionPackageId(this.internalObj);
    }

    setVideoTransitionDuration(duration, matchMode) {
        return Module.nvs_videoTransition_setVideoTransitionDuration(this.internalObj, duration, matchMode);
    }

    getVideoTransitionDuration() {
        return Module.nvs_videoTransition_getVideoTransitionDuration(this.internalObj);
    }
}

class NvsAudioTransition extends NvsFx {
    constructor() {
        super();
    }
}

class NvsVideoFx extends NvsFx {
    constructor() {
        super();
    }

    getVideoFxType() {
        return Module.nvs_videoFx_getVideoFxType(this.internalObj);
    }

    getIndex() {
        return Module.nvs_videoFx_getIndex(this.internalObj);
    }

    getBuiltinVideoFxName() {
        return Module.nvs_videoFx_getBuiltinVideoFxName(this.internalObj);
    }

    getVideoFxPackageId() {
        return Module.nvs_videoFx_getVideoFxPackageId(this.internalObj);
    }

    mapPointFromCanonicalToParticleSystem(ptCanonical) {
        return Module.nvs_videoFx_mapPointFromCanonicalToParticleSystem(this.internalObj, ptCanonical);
    }
}

class NvsAudioFx extends NvsFx {
    constructor() {
        super();
    }

    getIndex() {
        return Module.nvs_audioFx_getIndex(this.internalObj);
    }

    getBuiltinAudioFxName() {
        return Module.nvs_audioFx_getBuiltinAudioFxName(this.internalObj);
    }
}

class NvsParamInfoObject {
    constructor() {
        this.mapParams = mapParams;
    }

    getInteger(name) {
        this.mapParams.get(name);
    }

    getFloat(name) {
        this.mapParams.get(name);
    }

    getString(name) {
        this.mapParams.get(name);
    }

    getObject(name) {
        this.mapParams.get(name);
    }

    getBoolean(name) {
        this.mapParams.get(name);
    }

    setInteger(name, value) {
        this.mapParams.put(name, value);
    }

    setFloat(name, value) {
        this.mapParams.put(name, value);
    }

    setString(name, value) {
        this.mapParams.put(name, value);
    }

    setObject(name, value) {
        this.mapParams.put(name, value);
    }
}

class NvsFxDescription {
    constructor() {
        this.internalObj = 0;
    }

    getName() {
        return Module.nvs_fxDescription_getName(this.internalObj);
    }

    getAllParamsInfo() {
        return Module.nvs_fxDescription_getAllParamsInfo(this.internalObj);
    }
}

class NvsParticleSystemContext {
    constructor() {
        this.contextInterface = 0;
    }

    setEmitterEnabled(emitterName, enable) {
        Module.nvs_particleSystemContext_setEmitterEnabled(this.contextInterface, emitterName, enable);
    }

    setEmitterPosition(emitterName, emitterPositionX, emitterPositionY) {
        Module.nvs_particleSystemContext_setEmitterPosition(this.contextInterface, emitterName, emitterPositionX, emitterPositionY);
    }

    appendPositionToEmitterPositionCurve(emitterName, timeSec, emitterPositionX, emitterPositionY) {
        Module.nvs_particleSystemContext_appendPositionToEmitterPositionCurve(this.contextInterface, emitterName, timeSec, emitterPositionX, emitterPositionY);
    }

    setEmitterRateGain(emitterName, emitterGain) {
        Module.nvs_particleSystemContext_setEmitterRateGain(this.contextInterface, emitterName, emitterGain);
    }

    setEmitterParticleSizeGain(emitterName, emitterGain) {
        Module.nvs_particleSystemContext_setEmitterParticleSizeGain(this.contextInterface, emitterName, emitterGain);
    }
}

class NvsARSceneManipulate {
    constructor() {
        this.contextInterface = 0;
    }

    setDetectionMode(mode) {
        Module.nvs_arSceneManipulate_setDetectionMode(this.contextInterface, mode);
    }
}

const NvsParticleTypeEnum = Object.freeze({
    "PARTICLE_TYPE_NORMAL" : 0,
    "PARTICLE_TYPE_TOUCH" : 1,
    "PARTICLE_TYPE_GESTURE" : 2,
    "PARTICLE_TYPE_EYE" : 3,
    "PARTICLE_TYPE_MOUTH" : 4});

const NvsEmitterPlaceEnum = Object.freeze({
    "EMITTER_PLACE_LEFT" : 0,
    "EMITTER_PLACE_RIGHT" : 1,
    "EMITTER_PLACE_TOP" : 2,
    "EMITTER_PLACE_BOTTOM" : 3,
    "EMITTER_PLACE_CENTER" : 4});

class NvsParticleEmitterDesc {
    constructor() {
        this.emitterPlace = NvsEmitterPlaceEnum.EMITTER_PLACE_CENTER;
        this.emitterNames = [];
    }
}

class NvsAssetPackageParticleDescParser {
    constructor(fxDescription) {
        this.particleType = NvsParticleTypeEnum.PARTICLE_TYPE_NORMAL;
        this.emitters = [];

        var fxDescobj = JSON.parse(fxDescription);
        if (typeof(fxDescobj.particleType) !== 'undefined') {
            if (fxDescobj.particleType === 'touch') {
                this.particleType = NvsParticleTypeEnum.PARTICLE_TYPE_TOUCH
            } else if (fxDescobj.particleType === 'gesture') {
                this.particleType = NvsParticleTypeEnum.PARTICLE_TYPE_GESTURE
            } else if (fxDescobj.particleType === 'eye') {
                this.particleType = NvsParticleTypeEnum.PARTICLE_TYPE_EYE
            } else if (fxDescobj.particleType === 'mouth') {
                this.particleType = NvsParticleTypeEnum.PARTICLE_TYPE_MOUTH
            }
        }

       var array = fxDescobj.emitterDesc;
       for (var i = 0; i < array.length; i++) {
            var emitterDesc = array[i];
            var placeDesc = new NvsParticleEmitterDesc();
            placeDesc.emitterPlace = NvsEmitterPlaceEnum.EMITTER_PLACE_CENTER;
            if (typeof(emitterDesc.place) !== 'undefined') {
                if (emitterDesc.place === 'left') {
                    placeDesc.emitterPlace = NvsEmitterPlaceEnum.EMITTER_PLACE_LEFT;
                } else if (emitterDesc.place === 'right') {
                    placeDesc.emitterPlace = NvsEmitterPlaceEnum.EMITTER_PLACE_RIGHT;
                } else if (emitterDesc.place === 'top') {
                    placeDesc.emitterPlace = NvsEmitterPlaceEnum.EMITTER_PLACE_TOP;
                } else if (emitterDesc.place === 'bottom') {
                    placeDesc.emitterPlace = NvsEmitterPlaceEnum.EMITTER_PLACE_BOTTOM;
                }
            }

            if (typeof(emitterDesc.emitterName) !== 'undefined') {
                var emitterNames = emitterDesc.emitterName;
                for (var j = 0; j < emitterNames.length; j++) {
                    var name = emitterNames[j];
                    placeDesc.emitterNames.push(name);
                }
            }
            this.emitters.push(placeDesc);
        }
    }

    getParticlePartitionEmitter(partitionIndex) {
        if (partitionIndex >= this.emitters.length)
            return undefined;
        var emitterDesc = this.emitters[partitionIndex];
        return emitterDesc.emitterNames;
    }
}

class NvsVideoStreamInfo {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.duration = 0;
        this.frameRate = new NvsRational(0, 0);
        this.codecType = 0;
        this.rotation = 0;
    }
}

class NvsAudioStreamInfo {
    constructor() {
        this.channelCount = 0;
        this.sampleRate = 0;
        this.duration = 0;
    }
}

class NvsAVFileInfo {
    constructor() {
        this.duration = 0;
        this.videoStreamInfo = undefined;
        this.audioStreamInfo = [];
    }
}

class NvsPlaybackRateControlRegion {
    constructor() {
        this.startTime = 0;
        this.endTime = 0;
        this.playbackRate = 1;
        this.audioGain = 1;
    }
}

class NvsXmlStreamWriter {
    constructor(filePath) {
        this.filePath = filePath;
    }

    open() {
        return Module.nvs_xmlStreamWriter_open(this.filePath);
    }

    close() {
        return Module.nvs_xmlStreamWriter_close(this.filePath);
    }

    writeStartDocument() {
        return Module.nvs_xmlStreamWriter_writeStartDocument(this.filePath);
    }

    writeEndDocument() {
        return Module.nvs_xmlStreamWriter_writeEndDocument(this.filePath);
    }

    writeStartElement(element) {
        return Module.nvs_xmlStreamWriter_writeStartElement(this.filePath, element);
    }

    writeEndElement() {
        return Module.nvs_xmlStreamWriter_writeEndElement(this.filePath);
    }

    writeAttribute(name, value) {
        return Module.nvs_xmlStreamWriter_writeAttribute(this.filePath, name, value)
    }
}

class NvsXmlStreamReader {
    constructor(filePath) {
        this.filePath = filePath;
    }

    open() {
        return Module.nvs_xmlStreamReader_open(this.filePath);
    }

    close() {
        return Module.nvs_xmlStreamReader_close(this.filePath);
    }

    atEnd() {
        return Module.nvs_xmlStreamReader_atEnd(this.filePath);
    }

    hasError() {
        return Module.nvs_xmlStreamReader_hasError(this.filePath);
    }

    readNext() {
        return Module.nvs_xmlStreamReader_readNext(this.filePath);
    }

    readNextStartElement() {
        return Module.nvs_xmlStreamReader_readNextStartElement(this.filePath);
    }

    name() {
        return Module.nvs_xmlStreamReader_name(this.filePath);
    }

    isStartDocument() {
        return Module.nvs_xmlStreamReader_isStartDocument(this.filePath)
    }

    isEndDocument() {
        return Module.nvs_xmlStreamReader_isEndDocument(this.filePath)
    }

    isStartElement() {
        return Module.nvs_xmlStreamReader_isStartElement(this.filePath)
    }

    isEndElement() {
        return Module.nvs_xmlStreamReader_isEndElement(this.filePath)
    }

    getAttributeValue(attributeName) {
        return Module.nvs_xmlStreamReader_getAttributeValue(this.filePath, attributeName)
    }
}

class NvsAudioFileWriter {
    constructor(sampleRate, channelCount, outputAudioFilePath) {
        this.internalObj = 0;
        Module.nvs_audioFileWriter_init(this, sampleRate, channelCount, outputAudioFilePath);
    }

    setInternalObject(obj) {
        this.internalObj = obj;
    }

    getInternalObject() {
        return this.internalObj;
    }

    writeAudioData(audioData) {
        return Module.nvs_audioFileWriter_writeAudioData(this, audioData);
    }

    // NOTE: You must call close() to generate the final audio file and release resources hold by wasm!
    close() {
        return Module.nvs_audioFileWriter_close(this);
    }
}

function nvsInitClasses() {
    Module.Meishe.classMap = {
        NvsSdkVersion,
        NvsRational,
        NvsVideoResolution,
        NvsAudioResolution,
        NvsLiveWindow,
        NvsStreamingContext,
        NvsProjObj,
        NvsTimeline,
        NvsTrack,
        NvsVideoTrack,
        NvsAudioTrack,
        NvsClip,
        NvsVideoClip,
        NvsAudioClip,
        NvsPanAndScan,
        NvsVolume,
        NvsColor,
        NvsPointF,
        NvsRectF,
        NvsAssetPackageManager,
        NvsFx,
        NvsTimelineVideoFx,
        NvsTimelineCaption,
        NvsMotionParameters,
        NvsTimelineCompoundCaption,
        NvsTimelineAnimatedSticker,
        NvsVideoTransition,
        NvsAudioTransition,
        NvsVideoFx,
        NvsAudioFx,
        NvsParamInfoObject,
        NvsFxDescription,
        NvsParticleSystemContext,
        NvsARSceneManipulate,
        NvsVideoStreamInfo,
        NvsAudioStreamInfo,
        NvsAVFileInfo,
        NvsPlaybackRateControlRegion
    };

    Module.Meishe.getClassByName = function(className) {
        return Module.Meishe.classMap[className];
    }
}

