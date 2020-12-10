export default class ContentTranslator {
    static savedParams = {};
    static templates = {
        'card-group': {
            params: [],
            html: '<div class="card-group">'
        },
        '/card-group': {
            params: [],
            html: '</div>'
        },
        'card-deck': {
            params: [],
            html: '<div class="card-deck">'
        },
        '/card-deck': {
            params: [],
            html: '</div>'
        },
        'card': {
            params: ['src', 'title', 'content'],
            html: `<div class="card">
                    <img class="card-img-top" src="$src" alt="Card image cap">
                    <div class="card-body text-dark">
                        <h5 class="card-title">$title</h5>
                        <p class="card-text">$content</p>
                    </div>
                </div>`
        },
        'slider': {
            html: ''
        },
        'slider-item': {
            saveParams: true,
            params: ['src', 'title', 'content'],
            html: ''
        },
        '/slider': {
            html: ''
        }
    };

    static translate(content) {
        let translatedContent = content;
        for(let keyword in this.templates) {
            let html = this.templates[keyword]['html'];
            let params = this.templates[keyword]['params'];
            let shouldSaveParams = this.templates[keyword]['saveParams'];
            if(shouldSaveParams) {
                if(!(keyword in this.savedParams)) {
                    this.savedParams[keyword] = [];
                }
            }

            if(params && params.length > 0) {
                let pattern = new RegExp('\\[' + keyword + '.*\\]', 'g');
                let contents = translatedContent.match(pattern);
                if(contents === null)
                    continue;
                for(let content of contents) {
                    html = this.templates[keyword]['html'];
                    let paramDict = this.getParams(params, content);
                    if(shouldSaveParams)
                        this.savedParams[keyword].push(paramDict);

                    for(let paramName in paramDict) {
                        html = html.replace('$' + paramName, paramDict[paramName]);
                    }
                    translatedContent = translatedContent.replace(content, html);
                }

            } else {
                let pattern = new RegExp('\\[' + keyword + '\\]', 'g');
                translatedContent = translatedContent.replace(pattern, html);
            }
        }
        return translatedContent;
    }

    static getParams(paramNames, template) {
        let params = {};
        let pattern;
        for(let paramName of paramNames) {
            pattern = new RegExp(paramName + '="([^"]+)' + '"', 'g');
            let result = pattern.exec(template);
            if(result === null) {
                params[paramName] = '';
                continue;
            }
            params[paramName] = result[1];
        }
        return params;
    }

    static getSavedParams(keyword) {
        return this.savedParams[keyword];
    }
}
