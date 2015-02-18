var configs = [
    {
        ci_json_url:"http://localhost:8080/",
        refresh_interval: 24000,
        radiatorTitle: 'Sample 1',
        excludeFilter: [],
        includeFilter: ["build1","build2"]
    },
    {
        ci_json_url:"http://localhost:8080/",
        refresh_interval: 24000,
        radiatorTitle: 'Sample 2',
        excludeFilter: [],
        includeFilter: [],
        dynamicIncludeFilter: true,
        dynamicIncludeFilterUrl: "http://localhost:8081/radiator.xml"
    }
];

var config = configs[0];

var loggingConfig = {
    debug: false,
    info: true
}
