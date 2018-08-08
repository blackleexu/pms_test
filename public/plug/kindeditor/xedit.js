var pathName = window.document.location.pathname;
var projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);
var K = KindEditor;
function kindeditor() {
    window.editor_mini = K.create('.xedit_mini', {
        allowFileManager: false,
        allowImageRemote : false,
        width: '700px',
        height: '300px',
        cssData:'font-size:14px;',
        urlType: 'domain',
        uploadJson: projectName+"/common/core/upfile/index?name=kindeditor",
        items: [
            'source','fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
            'image','insertfile', 'removeformat', '|', 'link'
        ]
    });
}
KindEditor.ready(function() {
    kindeditor();
});