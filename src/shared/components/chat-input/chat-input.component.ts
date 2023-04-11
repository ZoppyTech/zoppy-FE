import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';

@Component({
    selector: 'chat-input',
    templateUrl: './chat-input.component.html',
    styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() public message: string = '';
    @Input() public isTemplate: boolean = false;
    @Output() public messageChange: EventEmitter<string> = new EventEmitter<string>();
    @ViewChild('inputElementRef') public inputElementRef?: ElementRef;
    @Input() public minRows: number = 1;
    @Input() public maxRows: number = 5;
    @Output() public onCleanInputEvent: EventEmitter<void> = new EventEmitter<void>();

    public isHovered: boolean = false;
    public contentEmpty: boolean = true;

    public readonly LINEBREAK_HTML_TAG: string = '<br>';
    public readonly INSERT_FROM_PASTE_EVENT_TYPE: string = 'insertFromPaste';
    public readonly KEY_ENTER_CODE: string = 'Enter';
    public readonly KEY_ESCAPE: string = 'Escape';

    public constructor() {
        //No Content
    }
    public ngOnChanges(changes: SimpleChanges): void {
        if (!changes['message'] || (!this.isTemplate && changes['message'].currentValue !== '')) return;
        this.textContent = changes['message'].currentValue;
    }

    public get inputElement() {
        return this.inputElementRef?.nativeElement;
    }

    public get textContent(): string {
        return this.inputElement?.innerHTML;
    }

    public set textContent(text: string) {
        if (!this.inputElement) return;
        this.inputElement.innerHTML = text;
    }

    public isContentTextEmpty(): boolean {
        let message: string = this.inputElement?.innerText;
        while (message.startsWith('\n')) message = message.slice(1, message.length);
        while (message.endsWith('\n')) message = message.slice(0, message.length - 1);
        this.contentEmpty = !message.trim();
        return this.contentEmpty;
    }

    public ngOnInit(): void {
        //no content
    }

    public ngAfterViewInit(): void {
        this.configurePlaceholder();
        this.configureInputMinNumberLines();
        this.configureInputMaxNumberLines();
    }

    public getMinRows(): number {
        return this.minRows > 0 ? this.minRows : 1;
    }

    public getMaxRows(): number {
        return this.maxRows < this.getMinRows() ? this.getMinRows() : this.maxRows;
    }

    public setMaxHeight(value: number): void {
        this.inputElement.style.maxHeight = value + 'px';
    }

    public setMinHeight(value: number): void {
        this.inputElement.style.minHeight = value + 'px';
    }

    public configurePlaceholder(): void {
        this.inputElement.setAttribute('placeholder', 'Escreva sua mensagem...');
    }

    public configureInputMinNumberLines(): void {
        this.setMinHeight(this.inputElement.offsetHeight * this.getMinRows());
    }

    public configureInputMaxNumberLines(): void {
        const linebreaks: Array<string> = new Array<string>(this.getMaxRows());
        linebreaks.fill(this.LINEBREAK_HTML_TAG);
        this.textContent += linebreaks.join('');
        this.setMaxHeight(this.inputElement.offsetHeight + 1);
        this.textContent = '';
    }

    public sendMessage() {
        if (!this.isContentTextEmpty()) {
            this.message = this.textContent;
            this.messageChange.emit(this.message);
        }
        this.cleanInput();
    }

    public onPaste(event: ClipboardEvent): void {
        debugger;
        event.preventDefault();
        const clipboardData: any = event.clipboardData || (window as any).clipboardData;
        const pastedText: string = clipboardData?.getData('text') || '';
        const cleanText: string = pastedText.replace(/<[^>]*>/g, '');

        // if (cleanText) {
        //     this.cursor.appendText(this.inputElement, cleanText);
        // }
    }

    public onInput(inputEvent: any): void {
        if (this.isContentTextEmpty()) {
            this.cleanInput();
            return;
        }
        this.message = this.textContent;
        this.messageChange.emit(this.message);
    }

    public onKeyDown(keyboardEvent: KeyboardEvent): void {
        if (keyboardEvent.code !== this.KEY_ENTER_CODE || keyboardEvent.shiftKey) return;
        if (this.isContentTextEmpty()) return;
        this.message = this.textContent;
        this.messageChange.emit(this.message);
        //this.cleanInput();
    }

    @HostListener('document:click', ['$event'])
    public clickout(event?: MouseEvent): void {
        if (event?.defaultPrevented) return;
        if (this.inputElement?.contains(event?.target)) return;
    }

    public cleanInput(): void {
        this.textContent = '';
        this.contentEmpty = true;
        this.message = this.textContent;
        this.messageChange.emit(this.message);
        this.onCleanInputEvent.emit();
    }
}
