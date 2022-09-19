/* eslint-disable class-methods-use-this */
import { Controller } from 'stimulus';
import SlimSelect from 'slim-select';

var flag = false;
var select;
export default class extends Controller {

    static values = { suggesttags: Array, taglist: Array}
    // eslint-disable-next-line class-methods-use-this
    connect() {
        const suggested_tags = [];
        for(let i in this.suggesttagsValue) {
            suggested_tags.push({
                text: this.suggesttagsValue[i]
            })
        }
        for(let i in this.taglistValue) {
            suggested_tags.push({
                text: this.taglistValue[i],
                selected: true
            })
        }
        console.log(suggested_tags);
        select = new SlimSelect({
            select: '#tag_list',
            addable: function (value) {
                return value.toLocaleLowerCase();
            },
            data: suggested_tags,
            searchPlaceholder: 'Search for suggested tags or add your customized tags!',
            placeholder: 'Click for suggested tags or add your customized tags!'
        })
    }

    // adding hidden input field for selected tags and appending it to the projectForm
    generateTags() {
        var input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", "tag_list");
        input.setAttribute("value", select.selected());
        document.getElementById("projectForm").appendChild(input);
    }

    copy() {
        const textarea = document.getElementById('result');
        var x = document.querySelector('.projectshow-embed-text-confirmation');
        textarea.select();
        document.execCommand('copy');
        x.style.display = 'block';
    }

    showEmbedLink() {
        const clockTimeEnable = document.querySelector('#checkbox-clock-time').checked;
        const displayTitle = document.querySelector('#checkbox-display-title').checked;
        const fullscreen = document.querySelector('#checkbox-fullscreen').checked;
        const zoomInOut = document.querySelector('#checkbox-zoom-in-out').checked;
        const theme = document.querySelector('#theme').value;
        const url = `${document.querySelector('#url').value}?theme=${theme}&display_title=${displayTitle}&clock_time=${clockTimeEnable}&fullscreen=${fullscreen}&zoom_in_out=${zoomInOut}`;
        let height = document.querySelector('#height').value;
        if (height === '') height = 500;
        let width = document.querySelector('#width').value;
        if (width === '') width = 500;
        const borderPr = document.querySelector('#border_px').value;
        const borderStyle = document.querySelector('#border_style').value;
        const borderColor = document.querySelector('#border_color').value;
        const markup = `<iframe src="${url}" style="border-width:${borderPr}; border-style: ${borderStyle}; border-color:${borderColor};" name="myiframe" id="projectPreview" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="${height}" width="${width}" allowFullScreen></iframe>`;
        document.querySelector('#result').innerText = markup;
        this.copy();
    }
}
