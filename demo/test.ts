import { SijilModule, BundlesService, RequireService } from 'sijil'
import { NgModule, Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { FormsModule, NgModel } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { platformBrowserDynamic }   from '@angular/platform-browser-dynamic'

@Component({
    selector: 'test-i18n',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <h1>{{ 'sijil.demo' | translate }}</h1>
        <div class="selector">
            <div>
                <label>
                    <s5l>choose.language</s5l>
                </label>
                <select [(ngModel)]="language">
                    <option value="fr">{{ 'fr' | translate }}</option>
                    <option value="en">{{ 'en' | translate }}</option>
                    <option value="it">{{ 'unsupported.language' | translate }}</option>
                </select>
            </div>
            
            <div>
                <label>
                    <s5l>use.default.lang</s5l>
                </label>
                <input type="checkbox" [(ngModel)]="defaultLanguage"/>
            </div>
           
            <div class="language-inspector">
                <label><s5l>loaded.languages</s5l></label>
                <span *ngFor="let language of bundlesService.getLoadedLanguages()">
                    <a href="javascript:void(0)" (click)="inspectedLanguage = language">{{language | translate}}</a>&nbsp;
                </span>
                <span *ngIf="inspectedLanguage">
                    <a href="javascript:void(0)" (click)="inspectedLanguage = null">[X]</a>
                </span>
                <!--p *ngIf="inspectedLanguage">{{ bundlesService.bundles[inspectedLanguage] | json }}</p-->
                <div *ngIf="inspectedLanguage">
                    <table class="language-inspector-table">
                        <thead>
                            <tr>
                                <th style="width: 30%">{{ 'key' | translate }}</th>
                                <th>{{ 'value' | translate }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr *ngFor="let key of getKeys(inspectedLanguage)">
                                <td>{{key}}</td>
                                <td><input [(ngModel)]="bundlesService.bundles[inspectedLanguage][key]" type="text"/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="demo-item-container">
            <div class="demo-item">
                <label>{{ 'plain.text' | translate }}</label>
                <s5l>hello</s5l>
            </div>
            <div class="demo-item">
                <label>{{ 'attributes' | translate }}</label> 
                <input attr.placeholder="{{ 'hello' | translate }}" type="text"/>
            </div>
            <div class="demo-item">
                <label>{{ 'specific.language' | translate }}</label>
                <s5l s5l-lang="en">fixed.language.en</s5l>.
            </div>
            <div class="demo-item">
                <div><label>{{ 'conditional.parameters' | translate }}</label></div>
                <div>
                    <div><s5l>subject.name</s5l> : <input [(ngModel)]="conditionalParams.name" type="text"/></div>
                    <div><s5l>bunny.number</s5l> : <input type="number" min="1" [(ngModel)]="conditionalParams.bunnyCount"></div>
                    <div><s5l>male</s5l> : <input type="checkbox" [(ngModel)]="conditionalParams.male"/></div>
                    <ul>
                        <li>
                            <s5l>fr</s5l> - <span>{{ 'conditional.sample' | translate:conditionalParams:'fr' }}</span>
                        </li>
                        <li>
                            <s5l>en</s5l> - <s5l [s5l-params]="conditionalParams" s5l-lang="en">conditional.sample</s5l>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="demo-item">
                <div><label>{{ 'positional.parameters' | translate }}</label></div>
                <div>
                    <p>
                        {{ '{' }}
                        <span *ngFor="let p of positionalParams; let i = index">{{p}}<span *ngIf="i < positionalParams.length - 1">,&nbsp;</span></span>
                        }
                        <button (click)="shuffleArray(positionalParams)"><s5l>shuffle</s5l></button>
                    </p>
                    <div><s5l [s5l-params]="positionalParams">positional.sample</s5l></div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        :host {
            line-height: 2em;
        }

        h1 {
            padding: 20px;
            border-bottom: 2px solid black;
        }

        label {
            font-weight: bold;
        }

        input[type="text"], input[type="number"] {
            outline: none;
            border: none;
            padding: 5px;
            border-bottom: 1px dashed black;
            transition: border 0.5s;
        }
        input[type="text"]:focus, input[type="number"]:focus {
            border-color: orange;
        }

        div.selector {
            margin-bottom: 20px;
            padding: 0px 30px 30px;
            border-bottom: 1px solid black;
        }
        div.selector > label {
        }
        div.selector > select {
            width: 200px;
        }
        :host > div:not(.selector) {}
        div:not(.selector) > label {}
        div.language-inspector table {
            width: 90%;
            margin: 15px;
            box-shadow: 2px 2px 10px #444;
            border-collapse: collapse;
        }
        div.language-inspector table.language-inspector-table th,
        div.language-inspector table.language-inspector-table td {
            border: 1px solid gray;
            padding: 10px;
        }
        div.language-inspector table.language-inspector-table td input[type="text"] {
            width: 95%;
        }

        .demo-item-container {
            display: flex;
            flex-wrap: wrap;
        }
        .demo-item {
            flex: 1;
            flex-basis: 20%;
            border-radius: 5px;
            padding: 15px 30px;
            box-shadow: 1px 1px 5px #444;
            margin: 10px;
            width: 25%;
            min-width: 200px;
            height: 0%;
        }
        .demo-item  label {
            display: block;
            margin-bottom: 15px;
            text-decoration: underline;
        }
        .demo-item button {
            background: none;
            outline: none;
            border: 1px solid black;
            margin: 10px;
            cursor: pointer;
            transition: background 0.5s;
        }
         .demo-item button:hover {
             background-color: yellow;
         }
    `]
})
class RootComponent implements OnInit{
    constructor(
        private ref: ChangeDetectorRef,
        private bundlesService: BundlesService){}

    private _language: string = window.navigator.language
    set language(lang: string) {
        this._language = lang
        this.bundlesService.currentLanguage = lang
        if(this.bundlesService.getLoadedLanguages().indexOf(lang) < 0)
            this.loadLang(lang)        
    }
    get language() {
        return this._language
    }

    private _inspectedLanguage : string
    set inspectedLanguage(lang: string) {
        this._inspectedLanguage = lang
        this.ref.markForCheck()
    }
    get inspectedLanguage() { return this._inspectedLanguage }

    private _useDefaultLanguage : boolean = true
    set defaultLanguage(check: boolean) {
        this._useDefaultLanguage = check
        this.bundlesService.defaultLanguage = check ? 'en' : null
        this.ref.markForCheck()
    }
    get defaultLanguage() {
        return this._useDefaultLanguage
    }

    private langPath(lang: string) {
        return `/demo/${lang}.json`
    }
    private loadLang(lang: string) {
        return this.bundlesService.loadBundle(this.langPath(lang), lang)
            .then(() => {
                this.ref.markForCheck()
            })
            .catch(() => {
                console.log(this.bundlesService.translate("unsupported.language"))
            })
    }

    private conditionalParams = { 
        name : 'Alice', 
        male: false, 
        bunnyCount: 1
    }
    private positionalParams = [ 'Robert', 'Diane', 'Francis' ]
    private shuffleArray = (a: any[]) => { 
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
         }
    }

    getKeys(lang: string) {
        return Object.keys(this.bundlesService['bundles'][lang])
    }

    ngOnInit() {
        this.bundlesService.defaultLanguage = 'en'
        this.loadLang('en').then(() => {
            return this.loadLang(this.language)
        })
    }
}

@NgModule({
    imports: [ BrowserModule, FormsModule, SijilModule ],
    declarations: [ RootComponent ],
    bootstrap: [ RootComponent ]
})
class TestModule {}

platformBrowserDynamic().bootstrapModule(TestModule)