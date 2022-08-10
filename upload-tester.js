const StreamingASRMonitor = require("@bikramjitroy/asr_monitoring_sdk");

var path = "dacx/AudioStreamRecording/en-IN--63e2de65-5820-4722-b09d-a65af5cfc999--6e030769-4d74-462d-8b52-abf8c2bfdf8e--.wav" 


let streamingASRMonitor = new StreamingASRMonitor();

var monitorEvent = {};
monitorEvent['audioFileName'] = "debug4.wav"
//StreamingASRMonitor.filePath = path;
//StreamingASRMonitor.
streamingASRMonitor.addFilepath(path);
streamingASRMonitor.addMonitorEvent(monitorEvent);
streamingASRMonitor.uploadAudioData();