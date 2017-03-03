Router.configure({
    layoutTemplate: "main",
    notFoundTemplate: "notFound"
});

Router.route("/", {
    template: "home"
});

Router.route('/city/:id', {
    template: "city",
    data: function () {
		return Cities.findOne({_id: this.params.id});	
    }
});
Router.route('/activity/:id', {
    template: "activity",
    data: function () {
		return Activities.findOne({_id: this.params.id});
    }
});
Router.route('/about', {
	template: "about"
});
