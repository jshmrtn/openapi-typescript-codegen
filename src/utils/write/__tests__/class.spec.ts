import { writeFileSync } from 'node:fs';

import { describe, expect, it, vi } from 'vitest';

import { writeClientClass } from '../class';

vi.mock('node:fs');

describe('writeClientClass', () => {
    it('should write to filesystem', async () => {
        const client: Parameters<typeof writeClientClass>[0] = {
            server: 'http://localhost:8080',
            version: 'v1',
            models: [],
            services: [],
        };

        const templates: Parameters<typeof writeClientClass>[1] = {
            client: () => 'client',
            core: {
                apiError: () => 'apiError',
                apiRequestOptions: () => 'apiRequestOptions',
                apiResult: () => 'apiResult',
                baseHttpRequest: () => 'baseHttpRequest',
                cancelablePromise: () => 'cancelablePromise',
                httpRequest: () => 'httpRequest',
                request: () => 'request',
                settings: () => 'settings',
                types: () => 'types',
                utils: {
                    omitReadonly: () => 'omitReadonly',
                },
            },
            exports: {
                model: () => 'model',
                schema: () => 'schema',
                service: () => 'service',
            },
            index: () => 'index',
        };

        await writeClientClass(client, templates, './dist', {
            client: 'fetch',
            enums: true,
            name: 'AppClient',
            postfixServices: '',
        });

        expect(writeFileSync).toHaveBeenCalled();
    });
});
