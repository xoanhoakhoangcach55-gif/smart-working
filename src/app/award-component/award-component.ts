import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-award-component',
  imports: [],
  templateUrl: './award-component.html',
  styleUrl: './award-component.css',
})
export class AwardComponent implements AfterViewInit{
  ngAfterViewInit() {
    // Luôn đưa về đầu trang khi reload
    window.scrollTo(0, 0);

    // Đợi browser render xong rồi mới bắt đầu scroll
    setTimeout(() => {
      this.autoScroll();
    }, 100);
  }

  autoScroll() {
    const duration = 10000;

    const end =
      document.documentElement.scrollHeight - window.innerHeight;

    const startTime = performance.now();
    let goingBack = false;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (!goingBack) {
        // Đầu -> cuối
        window.scrollTo(0, end * progress);
      } else {
        // Cuối -> đầu
        window.scrollTo(0, end * (1 - progress));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        if (!goingBack) {
          // Tới cuối → bắt đầu quay về đầu
          goingBack = true;

          // Reset thời gian
          requestAnimationFrame(() => {
            this.autoScrollBack(end);
          });
        } else {
          // Về đầu → chạy lại
          setTimeout(() => {
            this.autoScroll();
          }, 500);
        }
      }
    };

    requestAnimationFrame(animate);
  }

  autoScrollBack(end: number) {
    const duration = 10000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      window.scrollTo(0, end * (1 - progress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          this.autoScroll();
        }, 500);
      }
    };

    requestAnimationFrame(animate);
  }
}
