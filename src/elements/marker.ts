import {
    LitElement,
    customElement,
    property,
} from 'lit-element';

@customElement('nmsh-marker')
export class Marker extends LitElement
{
    @property({type: Number})
    lat = 0;

    @property({type: Number})
    lng = 0;

    @property({type: String})
    title = 'marker';
}
