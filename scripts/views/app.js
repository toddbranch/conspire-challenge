define([
    'backbone',
    'scripts/views/profiles',
    'scripts/collections/profiles',
    'scripts/views/sidebar'
], function(
    Backbone,
    ProfilesView,
    ProfilesCollection,
    SidebarView
) {
    'use strict';

    return Backbone.View.extend({
        className: 'row',

        initialize: function() {
            var profiles = new ProfilesCollection();
            profiles.fetch();

            this.profilesView = new ProfilesView({collection: profiles});
            this.listenTo(this.profilesView, 'selected', this.updateSidebar);

            this.sidebarView = new SidebarView();
        },

        updateSidebar: function(model) {
            this.sidebarView.update(model);
        },

        render: function() {
            this.$el.empty();
            this.$el.append(this.profilesView.render().$el);
            this.$el.append(this.sidebarView.render().$el);

            return this;
        }
    });
});
