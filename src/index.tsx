import React, { useRef, useEffect } from 'react';

interface ThreeDTiltProps {
  options?: TiltOptions;
  children: React.ReactNode;
  className?: string;
}

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  easing?: string;
  scale?: number;
  speed?: number;
  transition?: boolean;
  disableAxis?: 'x' | 'y' | null;
  reset?: boolean;
  glare?: boolean;
  maxGlare?: number;
  glarePrerender?: boolean;
}

const ThreeDTilt: React.FC<ThreeDTiltProps> = ({
  options,
  children,
  className,
}) => {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tiltElement = tiltRef.current;

    if (!tiltElement) return;

    const settings: TiltOptions = {
      maxTilt: 20,
      perspective: 300,
      easing: 'cubic-bezier(.03,.98,.52,.99)',
      scale: 1,
      speed: 400,
      transition: true,
      disableAxis: null,
      reset: true,
      glare: false,
      maxGlare: 1,
      ...options,
    };

    const state = {
      ticking: false,
      mousePositions: { x: 0, y: 0 },
      reset: false,
      glareElement: null as HTMLDivElement | null,
    };

    const requestTick = () => {
      if (!state.ticking) {
        requestAnimationFrame(updateTransforms);
        state.ticking = true;
      }
    };

    const bindEvents = () => {
      tiltElement.addEventListener('mousemove', handleMouseMove);
      tiltElement.addEventListener('mouseenter', handleMouseEnter);
      if (settings.reset)
        tiltElement.addEventListener('mouseleave', handleMouseLeave);
      if (settings.glare) window.addEventListener('resize', updateGlareSize);
    };

    const handleMouseEnter = () => {
      state.ticking = false;
      tiltElement.style.willChange = 'transform';
      setTransition();

      const event = new CustomEvent('tilt.mouseEnter');
      tiltElement.dispatchEvent(event);
    };

    const handleMouseMove = (event: MouseEvent) => {
      state.mousePositions = getMousePositions(event);
      requestTick();
    };

    const handleMouseLeave = () => {
      setTransition();
      state.reset = true;
      requestTick();

      const event = new CustomEvent('tilt.mouseLeave');
      tiltElement.dispatchEvent(event);
    };

    const setTransition = () => {
      tiltElement.style.transition = `${settings.speed}ms ${settings.easing}`;
      if (settings.glare && state.glareElement) {
        state.glareElement.style.transition = `opacity ${settings.speed}ms ${settings.easing}`;
      }
      setTimeout(() => {
        tiltElement.style.transition = '';
        if (settings.glare && state.glareElement) {
          state.glareElement.style.transition = '';
        }
      }, settings.speed);
    };

    const getMousePositions = (event: MouseEvent) => {
      const rect = tiltElement.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const getValues = () => {
      const width = tiltElement.offsetWidth;
      const height = tiltElement.offsetHeight;
      const left = tiltElement.offsetLeft;
      const top = tiltElement.offsetTop;
      const percentageX = (state.mousePositions.x - left) / width;
      const percentageY = (state.mousePositions.y - top) / height;
      const tiltX = (
        settings.maxTilt! / 2 -
        percentageX * settings.maxTilt!
      ).toFixed(2);
      const tiltY = (
        percentageY * settings.maxTilt! -
        settings.maxTilt! / 2
      ).toFixed(2);
      const angle =
        Math.atan2(
          state.mousePositions.x - (left + width / 2),
          -(state.mousePositions.y - (top + height / 2))
        ) *
        (180 / Math.PI);
      return {
        tiltX,
        tiltY,
        percentageX: percentageX * 100,
        percentageY: percentageY * 100,
        angle,
      };
    };

    const updateTransforms = () => {
      const transforms = getValues();

      if (state.reset) {
        state.reset = false;
        tiltElement.style.transform = `perspective(${settings.perspective}px) rotateX(0deg) rotateY(0deg)`;

        if (settings.glare && state.glareElement) {
          state.glareElement.style.transform =
            'rotate(180deg) translate(-50%, -50%)';
          state.glareElement.style.opacity = '0';
        }

        return;
      } else {
        tiltElement.style.transform = `perspective(${
          settings.perspective
        }px) rotateX(${
          settings.disableAxis === 'x' ? 0 : transforms.tiltY
        }deg) rotateY(${
          settings.disableAxis === 'y' ? 0 : transforms.tiltX
        }deg) scale3d(${settings.scale},${settings.scale},${settings.scale})`;

        if (settings.glare && state.glareElement) {
          state.glareElement.style.transform = `rotate(${transforms.angle}deg) translate(-50%, -50%)`;
          state.glareElement.style.opacity = `${
            (transforms.percentageY * settings.maxGlare!) / 100
          }`;
        }
      }

      state.ticking = false;
    };

    const prepareGlare = () => {
      const glareElementWrapper = document.createElement('div');
      glareElementWrapper.classList.add('js-tilt-glare');
      const glareElement = document.createElement('div');
      glareElement.classList.add('js-tilt-glare-inner');
      glareElementWrapper.appendChild(glareElement);

      const glarePrerender = settings.glarePrerender;
      if (!glarePrerender) tiltElement.appendChild(glareElementWrapper);

      state.glareElement = glareElement;

      const stretch = {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
      } as const;

      glareElementWrapper.style.cssText =
        'overflow:hidden;pointer-events:none;';
      Object.assign(glareElementWrapper.style, stretch);
      glareElement.style.cssText =
        'position:absolute;top:50%;left:50%;background-image:linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);';
      glareElement.style.width = `${tiltElement.offsetWidth * 2}px`;
      glareElement.style.height = `${tiltElement.offsetWidth * 2}px`;
      glareElement.style.transform = 'rotate(180deg) translate(-50%, -50%)';
      glareElement.style.transformOrigin = '0% 0%';
      glareElement.style.opacity = '0';
    };

    const updateGlareSize = () => {
      if (state.glareElement) {
        state.glareElement.style.width = `${tiltElement.offsetWidth * 2}px`;
        state.glareElement.style.height = `${tiltElement.offsetWidth * 2}px`;
      }
    };

    const destroyTilt = () => {
      if (!tiltElement) return;

      tiltElement.removeEventListener('mousemove', handleMouseMove);
      tiltElement.removeEventListener('mouseenter', handleMouseEnter);
      if (settings.reset)
        tiltElement.removeEventListener('mouseleave', handleMouseLeave);
      if (settings.glare) window.removeEventListener('resize', updateGlareSize);
      if (state.glareElement) state.glareElement.remove();
      tiltElement.style.willChange = '';
      tiltElement.style.transform = '';
    };

    const init = () => {
      if (settings.glare) prepareGlare();
      bindEvents();
    };

    init();

    return () => destroyTilt();
  }, [options]);

  return (
    <div
      className={`tilt-image-wrapper ${className ? className : ''}`}
      ref={tiltRef}
    >
      {children}
    </div>
  );
};

export default ThreeDTilt;
