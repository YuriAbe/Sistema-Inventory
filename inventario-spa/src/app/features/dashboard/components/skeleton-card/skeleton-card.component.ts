import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  template: `
    <div class="bg-dark-800 border border-dark-700 rounded-2xl p-5 overflow-hidden">
      <div class="skeleton h-6 w-24 rounded-lg mb-4"></div>
      <div class="skeleton w-12 h-12 rounded-xl mb-4"></div>
      <div class="skeleton h-4 w-3/4 rounded mb-2"></div>
      <div class="skeleton h-4 w-1/2 rounded mb-4"></div>
      <div class="skeleton h-7 w-28 rounded mb-4"></div>
      <div class="border-t border-dark-700 pt-4 flex gap-2">
        <div class="skeleton flex-1 h-8 rounded-xl"></div>
        <div class="skeleton w-8 h-8 rounded-xl"></div>
      </div>
    </div>
  `,
})
export class SkeletonCardComponent {}
