JR.RadiatorView = Backbone.View.extend({
    //id: 'container',
    // The default is div
    tagName: "div",
    className: "build-health-wrapper row-fluid",
    initialize: function(){
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);

        _.bindAll(this, 'loading');
        this.bind('loading', this.loading);
        _.bindAll(this, 'loaded');
        this.bind('loaded', this.loaded);

        this.lastSoundPlayed = "";
        this.initializeViews();
    },
    loading: function(){
        LOG.info("Loading...");
        $('#radiator-loading-indicator').show();
    },
    loaded: function(){
        LOG.info("...Loaded");
        $('#radiator-loading-indicator').hide();
    },
    initializeViews: function(){
        if(LOG.isDebugEnabled()){
            LOG.debug("Initializing radiator view parts");
        }

        // This view is displayed if all jobs are passing
        this.jobsPassingView = new JR.JobsPassingView();
        this.jobsPassingView.render();
        this.$el.append(this.jobsPassingView.el);

        //This view is displayed if there are failing jobs
        this.failingJobs = new JR.FailingJobs({failingJobs: this.model.getFailingJobs()});
        this.jobsFailingView = new JR.JobsFailingView({model:this.failingJobs});
        this.jobsFailingView.render();
        this.$el.append(this.jobsFailingView.el);

        this.buildMetrics = new JR.BuildMetrics({
            includedJobCount: this.model.getIncludedJobsCount(),
            passingJobCount: this.model.getPassingJobsCount(),
            failingJobCount: this.model.getFailingJobsCount(),
            buildingJobCount: this.model.getBuildingJobsCount(),
            disabledJobCount: this.model.getDisabledJobsCount()
        });
        this.metricsWrapperView = new JR.BuildMetricWrapperView({model:this.buildMetrics});
        this.metricsWrapperView.render();
        this.$el.append(this.metricsWrapperView.el);

        $('#container').html(this.el);
    },
    render: function(){
        if(LOG.isDebugEnabled()){
            LOG.debug("Rendering radiator view from radiator model");
        }
        // Set this, associated view rerenders itself
        this.failingJobs.set('failingJobs', this.model.getFailingJobs());
        this.failingJobs.trigger('change');

        this.buildMetrics.set('includedJobCount', this.model.getIncludedJobsCount());
        this.buildMetrics.set('passingJobCount', this.model.getPassingJobsCount());
        this.buildMetrics.set('failingJobCount', this.model.getFailingJobsCount());
        this.buildMetrics.set('buildingJobCount', this.model.getBuildingJobsCount());
        this.buildMetrics.set('disabledJobCount', this.model.getDisabledJobsCount());
        this.buildMetrics.trigger('change');

        // Render health indicators & audio
        this.renderHealth();
        this.renderAudio();
        return this;
    },
    renderHealth: function(){
        if (this.model.buildsAreFailing()) {
            this.jobsPassingView.$el.hide();
            this.jobsFailingView.$el.show();
        }else{
            this.jobsFailingView.$el.hide();
            this.jobsPassingView.$el.show();
        }
    },
    renderAudio: function(){
        if (this.model.buildsAreFailing() && this.lastSoundPlayed != "boo") {
            this.lastSoundPlayed = "boo";
            $("audio#booing-audio")[0].play();
        }else if (this.model.buildsArePassing() && this.lastSoundPlayed != "cheer"){
            this.lastSoundPlayed = "cheer";
            $("audio#cheering-audio")[0].play();
        }
    }
});