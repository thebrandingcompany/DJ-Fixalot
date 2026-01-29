
actions.fixCharacters = {
	title: _('Fix Characters'),
	hotkeyAble: true,
	icon: 'fixCharacters',
	disabled: uitools.notMediaListSelected,
    visible: window.uitools.getCanEdit,
    execute: async function() {
		// get list of selected songs
		var list = uitools.getSelectedTracklist();
        var dlg = uitools.openDialog('dlgFixCharacters', {
            show: true,
            modal: true,
            notShared: true,
            title: _('Fix Characters'),
            tracks: list
		});
	}
}

window._menuItems.editTags.action.submenu.push({
        action: actions.fixCharacters,
        order: 30,
        grouporder: 20
});