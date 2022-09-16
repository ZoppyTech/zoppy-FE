import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ChatUtility {
    //TODO: Create a DateProvider class
    // public configureFirstsMessagesOfDay(threads: Array<ThreadMessage>): void {
    //     if (threads.length <= 0) return;
    //     const firstMessage: ThreadMessage = threads[0];
    //     firstMessage.firstMessageOfDay = true;

    //     let firstMessageCreatedAt: Date = new Date(firstMessage.createdAt);
    //     for (const thread of threads) {
    //         if (!this.settings.dateProvider.differenceInCalendarDays(new Date(thread.createdAt), firstMessageCreatedAt)) continue;
    //         thread.firstMessageOfDay = true;
    //         firstMessageCreatedAt = new Date(thread.createdAt);
    //     }
    // }

    public scrollToBottom(elementId: string): void {
        const scroller: HTMLElement | null = document.getElementById(elementId);
        if (!scroller) return;
        scroller.scrollTop += scroller.scrollHeight;
    }
}
