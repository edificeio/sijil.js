import { RequireService } from '../dist/services/require/require.interface' 

import {fr, en} from './mocks'

export let simpleRequire = {
    load(from) {
        return new Promise((res, err) => {
            switch(from) {
                case 'fr':
                    res(fr)
                case 'en':
                    res(en)
                default:
                    err('unsupported.language')
            }
        })
    }
} 