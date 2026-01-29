(function () {
    window.uitools.addToolButton('righttoolbuttons', 'fixCharacters' /* icon */ , function () {
		// get list of selected songs
		var list = uitools.getSelectedTracklist();
        var dlg = uitools.openDialog('dlgFixCharacters', {
            show: true,
            modal: true,
            notShared: true,
            title: _('Fix Characters'),
            tracks: list
        });
    }, 'Fix Characters');
})();