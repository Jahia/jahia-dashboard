import {registry} from '@jahia/ui-extender';
import register from './Dashboard/register';

export default function () {
    registry.add('callback', 'dashboard', {
        targets: ['jahiaApp-init:5'],
        callback: register
    });
}
