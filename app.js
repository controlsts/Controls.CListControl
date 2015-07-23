/// <reference path="bower_components/controls.ts/controls.ts"/>
var gApp;
(function (gApp) {
    var note = Controls.makeNoneFocusable("idNote", "<p>Please use arrow keys</p>");
    var focus = Controls.makeNoneFocusable("idInfo");
    var data = [];
    for (var i = 0; i < 20; i++) {
        data.push({
            type: 'typeSamll',
            text: 'Loem ipsum ' + i,
            longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque molestie, quam eget consectetur aliquet, sem ex rhoncus mi, in consequat erat ligula fermentum lorem. Proin tristique quam nec urna ultricies, ac placerat ipsum rutrum. Nulla at lorem condimentum, pretium ligula et, molestie metus. Nulla placerat vestibulum magna ac ultrices. Fusce vitae tempor dui. Nam pulvinar commodo pellentesque. Mauris dignissim tempor pharetra. Praesent nec fermentum lacus. Phasellus vehicula velit sem, in malesuada mauris ornare non. Aenean lacinia dolor at ex molestie, quis mattis metus pulvinar. Praesent aliquet elit id condimentum fermentum. In elit turpis, aliquam non pharetra eu, sodales sed sem. Curabitur volutpat ac arcu quis venenatis. In vel gravida quam.'
        });
    }
    var root = Controls.LayoutGroupControl({
        el: document.body,
        orientation: 1 /* EVertical */,
        controls: [
            note,
            focus,
            Controls.ListControl({
                id: 'horizontal',
                itemWidth: 100,
                animation: true,
                orientation: 2 /* EHorizontal */,
                scrollScheme: 5 /* EByFixed */,
                onFocusedDataItemChanged: function (aKeyNew, aItemNew, aElNew, aKeyOld, aItemOld, aElOld) {
                    var focusInfo = focus.getElement();
                    focusInfo.innerHTML = 'Focused Item: ' + aItemNew.text;
                },
                onItemSelected: function (aControl, aIndex, aEl) {
                    var focusInfo = focus.getElement();
                    focusInfo.innerHTML = 'Selected Item: ' + aEl.innerText;
                },
                data: data,
                dataDrawer: function (aKey, aItem, aEl) {
                    aEl.classList.add('horizontal');
                    aEl.classList.add(aItem.type);
                    aEl.style.opacity = '.5';
                    aEl.innerText = aKey + ": " + aItem.text;
                    return 2 /* KFocusAble */;
                }
            }),
            Controls.ListControl({
                id: 'vertical',
                itemHeight: 70,
                animation: true,
                orientation: 1 /* EVertical */,
                scrollScheme: 5 /* EByFixed */,
                onFocusedDataItemChanged: function (aKeyNew, aItemNew, aElNew, aKeyOld, aItemOld, aElOld) {
                    var focusInfo = focus.getElement();
                    focusInfo.innerHTML = 'Focused Item: ' + aItemNew.text;
                },
                onItemSelected: function (aControl, aIndex, aEl) {
                    var focusInfo = focus.getElement();
                    focusInfo.innerHTML = 'Selected Item: ' + aEl.innerText;
                },
                data: data,
                dataDrawer: function (aKey, aItem, aEl) {
                    aEl.classList.add('horizontal');
                    aEl.classList.add(aItem.type);
                    aEl.style.opacity = '.5';
                    aEl.innerText = aKey + ": " + aItem.text;
                    return 2 /* KFocusAble */;
                }
            })
        ]
    });
    Controls.runRoot(root);
})(gApp || (gApp = {}));
//# sourceMappingURL=app.js.map