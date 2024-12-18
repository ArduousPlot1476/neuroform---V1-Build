type EventName = 'page_view' | 'button_click' | 'form_submit' | 'error';

interface AnalyticsEvent {
  name: EventName;
  properties?: Record<string, any>;
}

class Analytics {
  private queue: AnalyticsEvent[] = [];
  private isProcessing = false;

  public trackEvent(event: AnalyticsEvent): void {
    this.queue.push(event);
    this.processQueue();
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;
    const event = this.queue.shift();

    try {
      if (event) {
        await this.sendToAnalytics(event);
      }
    } catch (error) {
      console.error('Analytics error:', error);
    } finally {
      this.isProcessing = false;
      if (this.queue.length > 0) {
        this.processQueue();
      }
    }
  }

  private async sendToAnalytics(event: AnalyticsEvent): Promise<void> {
    // Implementation would depend on your analytics provider
    console.log('Analytics event:', event);
  }
}

export const analytics = new Analytics();