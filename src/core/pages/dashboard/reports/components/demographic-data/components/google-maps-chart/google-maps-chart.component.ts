import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapGeocoder, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { last } from 'rxjs';

@Component({
    selector: 'google-maps-chart',
    templateUrl: './google-maps-chart.component.html',
    styleUrls: ['./google-maps-chart.component.scss']
})
export class GoogleMapsChartComponent implements OnInit, AfterViewInit {
    public display: any;
    public center: google.maps.LatLngLiteral = {
        lat: -19.912998,
        lng: -43.940933
    };
    public zoom = 4;
    public mapInfoContent: string = 'Amigo estou aqui! :)';
    @ViewChild(MapInfoWindow) public infoWindow: MapInfoWindow | undefined;

    public markerPositions: google.maps.LatLngLiteral[] = [];

    public constructor(public geocoder: MapGeocoder) {}

    // public addMarker(event: google.maps.MapMouseEvent) {
    //     if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
    // }

    public openInfoWindow(marker: MapMarker) {
        if (this.infoWindow != undefined) this.infoWindow.open(marker);
    }

    public ngOnInit(): void {}

    public async onSearchTextChanged(searchText: string = ''): Promise<void> {
        this.center = { lat: -33.8666, lng: 151.1958 };
        const result: any = await this.geocoder
            .geocode({
                address: searchText
            })
            .subscribe(({ results }: any) => {
                this.center = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() };
                this.markerPositions = [];
                this.markerPositions.push(this.center);
                this.zoom = 15;
            });
        console.log(result);
    }

    public async ngAfterViewInit(): Promise<void> {}

    // public updateMapGeoLocation(lat: number, lng: number): void {
    //     this.center = {
    //         lat: lat,
    //         lng: lng
    //     };
    // }

    public moveMap(event: google.maps.MapMouseEvent): void {
        if (event.latLng != null) {
            console.log(event.latLng.toJSON());
            this.display = event.latLng.toJSON();
        }
    }

    public move(event: google.maps.MapMouseEvent): void {
        if (event.latLng != null) this.display = event.latLng.toJSON();
    }
}

class MapEmptyObject extends HTMLElement {}
