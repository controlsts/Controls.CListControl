/// <reference path="bower_components/controls.ts/controls.ts"/>

module gApp {

    var note = Controls.makeNoneFocusable("idNote", "<p>Please use arrow keys</p>");
    var focus = Controls.makeNoneFocusable("idInfo");

    var data = [];
    for (var i=0; i<20; i++) {
        data.push({
            type: 'typeSamll',
            text: 'Loem ipsum ' + i,
            longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque molestie, quam eget consectetur aliquet, sem ex rhoncus mi, in consequat erat ligula fermentum lorem. Proin tristique quam nec urna ultricies, ac placerat ipsum rutrum. Nulla at lorem condimentum, pretium ligula et, molestie metus. Nulla placerat vestibulum magna ac ultrices. Fusce vitae tempor dui. Nam pulvinar commodo pellentesque. Mauris dignissim tempor pharetra. Praesent nec fermentum lacus. Phasellus vehicula velit sem, in malesuada mauris ornare non. Aenean lacinia dolor at ex molestie, quis mattis metus pulvinar. Praesent aliquet elit id condimentum fermentum. In elit turpis, aliquam non pharetra eu, sodales sed sem. Curabitur volutpat ac arcu quis venenatis. In vel gravida quam.'
        });
    }

    var root = Controls.LayoutGroupControl({
        el: document.body,
        orientation: Controls.TParamOrientation.EVertical,
        controls: [
            note, focus,
            Controls.ListControl({
                id: 'horizontal',
                itemWidth: 100,
                animation: true,
                orientation: Controls.TParamOrientation.EHorizontal,
                scrollScheme: Controls.TParamScrollScheme.EByFixed,
                onFocusedDataItemChanged: function (
                    aKeyNew: any, aItemNew: any, aElNew: HTMLElement,
                    aKeyOld: any, aItemOld: any, aElOld: HTMLElement) {
                    var focusInfo = focus.getElement();
                    focusInfo.innerHTML = 'Focused Item: ' + aItemNew.text;
                },
                onItemSelected: function (aControl: Controls.CControl, aIndex: number, aEl: HTMLElement) {
                    var focusInfo = focus.getElement();
                    focusInfo.innerHTML = 'Selected Item: ' + aEl.innerText;
                },
                data: data,
                dataDrawer: function (aKey:any, aItem:any, aEl:HTMLElement) {
                    aEl.classList.add('horizontal');
                    aEl.classList.add(aItem.type);
                    aEl.style.opacity = '.5';
                    aEl.innerText = aKey + ": " + aItem.text;
                    return Controls.TFocusInfo.KFocusAble;
                }
            }),
            Controls.ListControl({
                id: 'vertical',
                itemHeight: 70,
                animation: true,
                orientation: Controls.TParamOrientation.EVertical,
                scrollScheme: Controls.TParamScrollScheme.EByFixed,
                onFocusedDataItemChanged: function (
                    aKeyNew: any, aItemNew: any, aElNew: HTMLElement,
                    aKeyOld: any, aItemOld: any, aElOld: HTMLElement) {
                    var focusInfo = focus.getElement();
                    focusInfo.innerHTML = 'Focused Item: ' + aItemNew.text;
                },
                onItemSelected: function (aControl: Controls.CControl, aIndex: number, aEl: HTMLElement) {
                    var focusInfo = focus.getElement();
                    focusInfo.innerHTML = 'Selected Item: ' + aEl.innerText;
                },
                data: data,
                dataDrawer: function (aKey:any, aItem:any, aEl:HTMLElement) {
                    aEl.classList.add('horizontal');
                    aEl.classList.add(aItem.type);
                    aEl.style.opacity = '.5';
                    aEl.innerText = aKey + ": " + aItem.text;
                    return Controls.TFocusInfo.KFocusAble;
                }
            })
        ]
    });

    Controls.runRoot(root);

}
