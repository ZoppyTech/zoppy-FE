import { Component, Input, OnInit } from '@angular/core';
import { WcCouponEntity } from 'src/shared/models/entities/wc-coupon.entity';
import { SocialMediaGiftbackResponse } from 'src/shared/models/responses/social-media/social-media-customer-detail.response';

@Component({
    selector: 'app-giftback-alert-box',
    templateUrl: './giftback-alert-box.component.html',
    styleUrls: ['./giftback-alert-box.component.scss']
})
export class GiftbackAlertBoxComponent {
    @Input() public giftback: WcCouponEntity | SocialMediaGiftbackResponse | undefined = undefined;
    @Input() public name: string = '';
    @Input() public layout: Layout = 'box';
    public constructor() {}
}

export type Layout = 'box' | 'alert';
