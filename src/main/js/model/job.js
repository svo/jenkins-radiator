// This represents a Jenkins job
JR.Job = JR.BaseModel.extend({
    // Use the job url as the id
    idAttribute: "name",
    validate: function(attrs){
        if(!this.colorIsValid(attrs.color)){
            return "Color of job is unknown";
        }
    },
    colorIsValid: function(color){
        return _.contains(this.jobColors.failing, color)
            || _.contains(this.jobColors.passing, color)
            || _.contains(this.jobColors.unstable, color)
            || _.contains(this.jobColors.building, color)
            || _.contains(this.jobColors.aborted, color)
            || _.contains(this.jobColors.disabled, color);

    },
    jobColors: {
        failing: ['red','red_anime'],
        passing: ['blue','blue_anime'],
        unstable: ['yellow'],
        building: ['blue_anime','red_anime'],
        disabled: ['grey','disabled'],
        aborted: ['aborted']
    },
    url: function(){
        return this.urlRoot() + "/job/" + this.id + this.urlPostfixForJsonApi;
    },
    relations: [{
        type: Backbone.HasMany,
        key: 'builds',
        relatedModel: 'JR.Build'
    }],
    getName: function(){
        return this.get("name");
    },
    getColor: function(){
        return this.get("color");
    },
    getUrl: function(){
        return this.get("url");
    },
    getBuilds: function(){
        return this.get("builds");
    },
    isInQueue: function(){
        return this.get("inQueue");
    },
    isFailing: function(){
        return _.contains(this.jobColors.failing, this.getColor());
    },
    isPassing: function(){
        return _.contains(this.jobColors.passing, this.getColor());
    },
    isBuilding: function(){
        return _.contains(this.jobColors.building, this.getColor());
    },
    isDisabled: function(){
        return _.contains(this.jobColors.disabled, this.getColor());
    },
    isAborted: function(){
        return _.contains(this.jobColors.aborted, this.getColor());
    },
    isUnstable: function(){
        return _.contains(this.jobColors.unstable, this.getColor());
    }
});


/*
 Example data
 {
 "actions": [
 {},
 {},
 {},
 {}
 ],
 "buildable": true,
 "builds": [
 {
 "number": 1094,
 "url": "https://builds.apache.org/job/ActiveMQ/1094/"
 },
 {
 "number": 1093,
 "url": "https://builds.apache.org/job/ActiveMQ/1093/"
 }
 ],
 "color": "red",
 "concurrentBuild": false,
 "description": "<img src=\"http://activemq.apache.org/images/activemq-logo.png\" />\r\n<p>\r\n<a href=\"http://activemq.apache.org\">http://activemq.apache.org</a>",
 "displayName": "ActiveMQ",
 "displayNameOrNull": null,
 "downstreamProjects": [],
 "firstBuild": {
 "number": 976,
 "url": "https://builds.apache.org/job/ActiveMQ/976/"
 },
 "healthReport": [
 {
 "description": "Build stability: All recent builds failed.",
 "iconUrl": "health-00to19.png",
 "score": 0
 },
 {
 "description": "Test Result: 0 tests failing out of a total of 1,130 tests.",
 "iconUrl": "health-80plus.png",
 "score": 100
 }
 ],
 "inQueue": false,
 "keepDependencies": false,
 "lastBuild": {
 "number": 1094,
 "url": "https://builds.apache.org/job/ActiveMQ/1094/"
 },
 "lastCompletedBuild": {
 "number": 1094,
 "url": "https://builds.apache.org/job/ActiveMQ/1094/"
 },
 "lastFailedBuild": {
 "number": 1094,
 "url": "https://builds.apache.org/job/ActiveMQ/1094/"
 },
 "lastStableBuild": {
 "number": 976,
 "url": "https://builds.apache.org/job/ActiveMQ/976/"
 },
 "lastSuccessfulBuild": {
 "number": 1075,
 "url": "https://builds.apache.org/job/ActiveMQ/1075/"
 },
 "lastUnstableBuild": {
 "number": 1075,
 "url": "https://builds.apache.org/job/ActiveMQ/1075/"
 },
 "lastUnsuccessfulBuild": {
 "number": 1094,
 "url": "https://builds.apache.org/job/ActiveMQ/1094/"
 },
 "modules": [
 {
 "color": "notbuilt",
 "displayName": "ActiveMQ :: All JAR bundle",
 "name": "org.apache.activemq:activemq-all",
 "url": "https://builds.apache.org/job/ActiveMQ/org.apache.activemq$activemq-all/"
 },
 {
 "color": "red",
 "displayName": "ActiveMQ :: Core",
 "name": "org.apache.activemq:activemq-core",
 "url": "https://builds.apache.org/job/ActiveMQ/org.apache.activemq$activemq-core/"
 },
 {
 "color": "disabled",
 "displayName": "ActiveMQ :: jmdns 1.0",
 "name": "org.apache.activemq:activemq-jmdns_1.0",
 "url": "https://builds.apache.org/job/ActiveMQ/org.apache.activemq$activemq-jmdns_1.0/"
 }
 ],
 "name": "ActiveMQ",
 "nextBuildNumber": 1095,
 "property": [
 {}
 ],
 "queueItem": null,
 "scm": {},
 "upstreamProjects": [],
 "url": "https://builds.apache.org/job/ActiveMQ/"
 }
 */