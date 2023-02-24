import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapGeocoder, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { WcAddressEntity } from 'src/shared/models/entities/wc-address.entity';
import { GetReportRequest } from 'src/shared/models/requests/report/get-report.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { ReportService } from 'src/shared/services/reports/report.service';

@Component({
    selector: 'google-maps-chart',
    templateUrl: './google-maps-chart.component.html',
    styleUrls: ['./google-maps-chart.component.scss']
})
export class GoogleMapsChartComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() public reportRequest: GetReportRequest = {
        startPeriod: new Date(),
        finishPeriod: new Date()
    };
    public addresses: Array<WcAddressEntity> = [];
    @ViewChild('mapContainer', { static: false }) public declare gmap: ElementRef;
    @ViewChild(MapInfoWindow) public infoWindow: MapInfoWindow | undefined;
    public declare map: google.maps.Map;
    public declare heatmap: google.maps.visualization.HeatmapLayer;
    public declare mapOptions: google.maps.MapOptions;
    public declare marker: google.maps.Marker;
    public markers: Array<google.maps.Marker> = [];
    public coordinatesOfBrazil: google.maps.LatLngLiteral = {
        lat: -19.912998,
        lng: -43.940933
    };
    public zoom = 4;
    public isLoading: boolean = true;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public beachflag: string = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    public savedPoints: Array<google.maps.LatLng> = [];
    public markersVisible: boolean = false;
    public gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
    ];

    public constructor(
        public geocoder: MapGeocoder,
        private readonly reportsService: ReportService,
        private readonly toast: ToastService
    ) {}

    public ngOnInit(): void {
        this.mapOptions = {
            zoom: this.zoom,
            center: this.coordinatesOfBrazil,
            mapTypeControl: true,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            panControl: false
        };
        this.setEvents();
    }

    public setEvents(): void {
        BroadcastService.subscribe(this, 'refresh-report', async (period: GetReportRequest) => {
            this.reportRequest.startPeriod = period.startPeriod;
            this.reportRequest.finishPeriod = period.finishPeriod;
            this.isLoading = true;
            await this.refreshMap();
        });
    }

    public ngOnDestroy(): void {
        BroadcastService.dispose(this);
    }

    public async ngAfterViewInit(): Promise<void> {
        await this.refreshMap();
    }

    public async refreshMap(): Promise<void> {
        await this.fetchData();
        this.isLoading = false;
        setTimeout(() => {
            this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, this.mapOptions);
            this.heatmap = new google.maps.visualization.HeatmapLayer({
                data: this.getPoints(),
                map: this.map,
                radius: 20,
                opacity: 1,
                gradient: this.gradient
            });
            this.heatmap.setMap(this.map);
        });
    }

    public async fetchData(): Promise<void> {
        try {
            this.addresses = await this.reportsService.getAddresses(this.reportRequest);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter os clientes');
        }
    }

    public openInfoWindow(marker: MapMarker) {
        if (this.infoWindow != undefined) this.infoWindow.open(marker);
    }

    public resetMap(): void {
        if (!this.marker) return;
        this.marker.setMap(null);
        this.map.setCenter(this.coordinatesOfBrazil);
        this.map.setZoom(this.zoom);
    }

    public async onSearchTextChanged(searchText: string = ''): Promise<void> {
        if (searchText.trimEnd() === '') {
            this.resetMap();
            return;
        }

        await this.geocoder
            .geocode({
                address: searchText
            })
            .subscribe(({ results }: any) => {
                if (results.length <= 0) {
                    this.toast.error('Não foi possível encontrar o endereço selecionado.', 'Erro Google Maps!');
                    this.resetMap();
                    return;
                }
                this.resetMap();
                const newCoordinates: google.maps.LatLngLiteral = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                };
                this.marker = new google.maps.Marker({
                    position: newCoordinates,
                    icon: this.beachflag,
                    title: 'Você marcou este ponto!',
                    map: this.map
                });
                this.marker.setMap(this.map);
                this.map.setCenter(newCoordinates);
                this.map.setZoom(15);
            });
    }

    public getPoints(): Array<google.maps.LatLng> {
        const points: Array<google.maps.LatLng> = this.addresses
            .filter((address: WcAddressEntity) => address.latitude && address.longitude)
            .map((address: WcAddressEntity) => {
                return new google.maps.LatLng(address.latitude, address.longitude);
            });
        this.savedPoints = points;
        return [...points];
    }

    public toggleMarkers(): void {
        this.markersVisible = !this.markersVisible;
        if (!this.markersVisible || this.savedPoints.length <= 0) {
            this.markers.forEach((marker: google.maps.Marker) => {
                marker.setMap(null);
            });
            return;
        }

        this.savedPoints.map((coordinate: google.maps.LatLng) => {
            const marker: google.maps.Marker = new google.maps.Marker({
                position: { lat: coordinate.lat(), lng: coordinate.lng() },
                map: this.map
            });
            this.markers.push(marker);
            marker.setMap(this.map);
        });
    }
}

class MapEmptyObject extends HTMLElement {}
