import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MapGeocoder, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { GetReportRequest, ReportPeriod } from 'src/shared/models/requests/report/get-report.request';
import { ReportCustomerResponse } from 'src/shared/models/responses/reports/report-customer.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { ReportService } from 'src/shared/services/reports/report.service';

@Component({
    selector: 'google-maps-chart',
    templateUrl: './google-maps-chart.component.html',
    styleUrls: ['./google-maps-chart.component.scss']
})
export class GoogleMapsChartComponent implements OnInit, AfterViewInit {
    @Input() public reportRequest: GetReportRequest = {
        period: 'all' as ReportPeriod
    };
    public customers: Array<ReportCustomerResponse> = [];
    @ViewChild('mapContainer', { static: false }) public declare gmap: ElementRef;
    @ViewChild(MapInfoWindow) public infoWindow: MapInfoWindow | undefined;
    public declare map: google.maps.Map;
    public declare heatmap: google.maps.visualization.HeatmapLayer;
    public declare mapOptions: google.maps.MapOptions;
    public declare marker: google.maps.Marker;
    public markerPositions: google.maps.LatLngLiteral[] = [];
    public coordinatesOfBrazil: google.maps.LatLngLiteral = {
        lat: -19.912998,
        lng: -43.940933
    };
    public zoom = 4;
    public isLoading: boolean = true;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    public constructor(
        public geocoder: MapGeocoder,
        private readonly reportsService: ReportService,
        private readonly toast: ToastService
    ) {}

    public ngOnInit(): void {
        this.mapOptions = {
            zoom: this.zoom,
            center: this.coordinatesOfBrazil,
            mapTypeControl: false,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            panControl: false
        };
    }

    public async ngAfterViewInit(): Promise<void> {
        await this.refreshMap();
    }

    public async refreshMap(): Promise<void> {
        await this.fetchCustomers();
        this.isLoading = false;
        setTimeout(() => {
            this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, this.mapOptions);
            this.heatmap = new google.maps.visualization.HeatmapLayer({
                data: this.getPoints(),
                map: this.map
            });
        });
    }

    public fetchCustomers(): void {
        try {
            //this.customers = await this.reportsService.getCustomers(this.reportRequest);
            this.customers = this.createFakeCustomers();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter os clientes');
        }
    }

    public openInfoWindow(marker: MapMarker) {
        if (this.infoWindow != undefined) this.infoWindow.open(marker);
    }

    public resetMap(): void {
        this.markerPositions = [];
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
                const newCoordinates: google.maps.LatLngLiteral = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                };
                this.markerPositions = [];
                this.markerPositions.push(newCoordinates);
                this.marker = new google.maps.Marker({
                    position: newCoordinates,
                    map: this.map
                });
                this.marker.setMap(this.map);
                this.map.setCenter(newCoordinates);
                this.map.setZoom(15);
            });
    }

    // public updateMapGeoLocation(lat: number, lng: number): void {
    //     this.center = {
    //         lat: lat,
    //         lng: lng
    //     };
    // }

    public getPoints(): Array<google.maps.LatLng> {
        const points: Array<google.maps.LatLng> = this.customers
            .filter((customer: ReportCustomerResponse) => {
                return customer.lat && customer.lng;
            })
            .map((customer: ReportCustomerResponse) => {
                return new google.maps.LatLng(customer.lat ?? -19.912998, customer.lng ?? -43.940933);
            });
        return [...points];
    }

    private createFakeCustomers(): ReportCustomerResponse[] {
        const points: Array<{ lat: number; lng: number }> = [
            { lat: -19.9799293, lng: -43.9753619 },
            { lat: -19.9396903, lng: -43.9599189 },
            { lat: -19.9694479, lng: -43.9685091 },
            { lat: -19.451237, lng: -44.2495303 },
            { lat: -19.4925799, lng: -42.5316537 },
            { lat: -19.8958262, lng: -44.0869711 },
            { lat: -22.1842195, lng: -49.9273831 },
            { lat: -19.9382333, lng: -43.9356312 },
            { lat: -19.8612184, lng: -43.9342899 },
            { lat: -19.9209654, lng: -44.0825165 },
            { lat: -19.9301651, lng: -43.9945246 }
        ];

        return points.map((point: { lat: number; lng: number }) => {
            const customer: ReportCustomerResponse = new ReportCustomerResponse();
            customer.lat = point.lat;
            customer.lng = point.lng;
            return customer;
        });
    }
}

class MapEmptyObject extends HTMLElement {}
