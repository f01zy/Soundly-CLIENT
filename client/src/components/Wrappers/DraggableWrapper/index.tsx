import { useEffect, useRef, useState } from 'react';

const DraggableWrapper = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const objectRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const object = objectRef.current!

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      object.style.transform = 'none';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;
      const boxRect = object.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const distanceX = mouseX - (boxRect.left + boxRect.width / 2);
      const distanceY = mouseY - (boxRect.top + boxRect.height / 2);
      const width = boxRect.width;
      const height = boxRect.height;

      if (distanceX > width || distanceY > height) {
        return object.style.transform = 'none';
      }

      const offsetX = distanceX / 5;
      const offsetY = distanceY / 5;

      object.style.transform = `scale(1.05) translate(${offsetX}px, ${offsetY}px)`;
    };

    object.addEventListener('mouseenter', handleMouseEnter);
    object.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      object.removeEventListener('mouseenter', handleMouseEnter);
      object.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovering]);

  return (
    <div ref={objectRef} style={{ display: 'inline-block', transition: 'transform 0.1s ease', willChange: "transform" }}>
      {children}
    </div>
  );
};

export default DraggableWrapper;