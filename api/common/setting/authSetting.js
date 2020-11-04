export default class authSetting {
    static AUTH_TOKEN_MIDDLEWARE_BLACKLIST = {
        'api': {
            'root': ['*'],
            'user': {
                'root': ['post'],
                'login': ['*'],
                'logout': ['*'],
                'reset_password': ['post'],
                'reset_password_code': ['post']
            },
            'index': ['*'],
            'building': {
                '*': ['get']
            },
            'client': {
                'root': ['post'],
                '*': ['get']
            },
            'client_track': {
                'root': ['post'],
                'recent': {
                    '*': ['get']
                }
            }
        }
    }
}
