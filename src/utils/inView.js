export const inView = ({id, threshold}) => {
    const observer = new IntersectionObserver(
        (entries) => {
        entries.forEach((entry) => {
            const element = entry.target;
            if (entry.isIntersecting) {
            // 进入可视区域，添加 in-view 类，触发对齐动画
            element.classList.add('in-view');
            } else {
            // 离开可视区域，移除 in-view 类，恢复错位状态
            element.classList.remove('in-view');
            }
        });
        },
        {
            threshold: threshold || 0.2, // 当 20% 的元素可见时触发
        }
    );

    const featuresLayout = document.getElementById(id);
    if (featuresLayout) {
        observer.observe(featuresLayout);
    }
} 