import { useEffect, useRef } from 'react';

/**
 * Hook that applies scroll-reveal animation to elements within a container.
 * Elements with className `.scroll-reveal` inside the container will fade-in
 * when they enter the viewport.
 */
export function useScrollReveal<T extends HTMLElement>(deps: unknown[] = []) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const container = ref.current;
        if (!container) return;

        // Check for reduced-motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            container.querySelectorAll('.scroll-reveal').forEach((el) => {
                el.classList.add('revealed');
            });
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        const elements = container.querySelectorAll('.scroll-reveal');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return ref;
}
