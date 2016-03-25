'use babel';

import VueAutocompleteView from './vue-autocomplete-view';
import { CompositeDisposable } from 'atom';

export default {

  vueAutocompleteView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.vueAutocompleteView = new VueAutocompleteView(state.vueAutocompleteViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.vueAutocompleteView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vue-autocomplete:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.vueAutocompleteView.destroy();
  },

  serialize() {
    return {
      vueAutocompleteViewState: this.vueAutocompleteView.serialize()
    };
  },

  toggle() {
    console.log('VueAutocomplete was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
