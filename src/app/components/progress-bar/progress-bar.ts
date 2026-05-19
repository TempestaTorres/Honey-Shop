import {
  Component,
  effect,
  ElementRef, input, viewChild,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.css',
})
export class ProgressBar {

  maxValue = input.required<number>();           // e.g. 150
  currentValue = input.required<number>();       // current total price

  private readonly progressLine = viewChild<ElementRef<HTMLDivElement>>('line');

  constructor() {

    effect(() => {

      this.updateProgress();
    });
  }

  updateProgress(): void {

    const line = this.progressLine()?.nativeElement;
    if (!line) return;

    const max = this.maxValue();
    const current = Math.max(0, this.currentValue()); // prevent negative values

    // Calculate percentage (clamped between 0 and 100)
    const perc = Math.min(100, Math.max(0, (current / max) * 100));

    line.style.transform = `scaleX(${perc / 100})`;

    // Remove all classes first
    line.classList.remove('low', 'medium', 'high', 'reached');

    // Add color class
    if (perc >= 99.9) {
      line.classList.add('reached');
    } else if (perc >= 80) {
      line.classList.add('high');
    } else if (perc >= 50) {
      line.classList.add('medium');
    } else {
      line.classList.add('low');
    }
  }
}
