import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedBrain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const size = Math.min(window.innerWidth * 0.4, 400);
      canvas.width = size;
      canvas.height = size;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Brain parameters
    const brainParams = {
      centerX: canvas.width / 2,
      centerY: canvas.height / 2,
      radius: canvas.width * 0.35,
      lobes: 6,
      folds: 12,
      foldDepth: 0.15,
      rotationSpeed: 0.001,
      pulseSpeed: 0.005,
      pulseAmount: 0.05,
      colorPrimary: '#8b5cf6',
      colorSecondary: '#6366f1',
      colorHighlight: '#f472b6',
      neuronCount: 50,
      neuronSpeed: 0.5,
      neuronSize: 2,
      neuronTrailLength: 10,
    };
    
    // Neuron class for the electrical impulses
    class Neuron {
      x: number;
      y: number;
      angle: number;
      speed: number;
      size: number;
      color: string;
      trail: {x: number, y: number}[];
      trailLength: number;
      
      constructor() {
        this.angle = Math.random() * Math.PI * 2;
        this.speed = (Math.random() * 0.5 + 0.5) * brainParams.neuronSpeed;
        this.size = Math.random() * brainParams.neuronSize + 1;
        
        // Position neuron within the brain
        const r = Math.random() * brainParams.radius * 0.8;
        this.x = brainParams.centerX + Math.cos(this.angle) * r;
        this.y = brainParams.centerY + Math.sin(this.angle) * r;
        
        // Random color from the palette
        const colors = [brainParams.colorPrimary, brainParams.colorSecondary, brainParams.colorHighlight];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Trail for the neuron
        this.trail = [];
        this.trailLength = Math.floor(Math.random() * brainParams.neuronTrailLength) + 5;
      }
      
      update() {
        // Random movement within the brain
        this.angle += (Math.random() - 0.5) * 0.2;
        
        // Keep track of previous position for trail
        this.trail.unshift({x: this.x, y: this.y});
        if (this.trail.length > this.trailLength) {
          this.trail.pop();
        }
        
        // Move neuron
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        
        // Keep neurons within the brain
        const distFromCenter = Math.sqrt(
          Math.pow(this.x - brainParams.centerX, 2) + 
          Math.pow(this.y - brainParams.centerY, 2)
        );
        
        if (distFromCenter > brainParams.radius * 0.8) {
          // Bounce back toward center
          this.angle = Math.atan2(
            brainParams.centerY - this.y,
            brainParams.centerX - this.x
          );
        }
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        // Draw trail
        ctx.beginPath();
        for (let i = 0; i < this.trail.length; i++) {
          const alpha = 1 - i / this.trail.length;
          ctx.strokeStyle = this.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
          ctx.lineWidth = this.size * (1 - i / this.trail.length);
          
          if (i === 0) {
            ctx.moveTo(this.trail[i].x, this.trail[i].y);
          } else {
            ctx.lineTo(this.trail[i].x, this.trail[i].y);
          }
        }
        ctx.stroke();
        
        // Draw neuron
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    // Create neurons
    const neurons: Neuron[] = [];
    for (let i = 0; i < brainParams.neuronCount; i++) {
      neurons.push(new Neuron());
    }
    
    // Animation variables
    let rotation = 0;
    let pulse = 0;
    let animationFrameId: number;
    
    // Draw brain function
    const drawBrain = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update animation values
      rotation += brainParams.rotationSpeed;
      pulse += brainParams.pulseSpeed;
      const pulseFactor = 1 + Math.sin(pulse) * brainParams.pulseAmount;
      
      // Draw brain outline
      ctx.save();
      ctx.translate(brainParams.centerX, brainParams.centerY);
      ctx.rotate(rotation);
      
      // Create gradient for brain
      const gradient = ctx.createLinearGradient(
        -brainParams.radius, -brainParams.radius, 
        brainParams.radius, brainParams.radius
      );
      gradient.addColorStop(0, brainParams.colorPrimary);
      gradient.addColorStop(1, brainParams.colorSecondary);
      
      // Draw brain lobes
      for (let i = 0; i < brainParams.lobes; i++) {
        const angle = (i / brainParams.lobes) * Math.PI * 2;
        const lobeX = Math.cos(angle) * brainParams.radius * 0.8 * pulseFactor;
        const lobeY = Math.sin(angle) * brainParams.radius * 0.8 * pulseFactor;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        
        // Use Bezier curves for lobes
        for (let j = 0; j < brainParams.folds; j++) {
          const foldAngle = angle + (j / brainParams.folds) * (Math.PI * 2 / brainParams.lobes);
          const foldX = Math.cos(foldAngle) * brainParams.radius * (1 - Math.sin(j * 5) * brainParams.foldDepth) * pulseFactor;
          const foldY = Math.sin(foldAngle) * brainParams.radius * (1 - Math.sin(j * 5) * brainParams.foldDepth) * pulseFactor;
          
          ctx.lineTo(foldX, foldY);
        }
        
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowColor = brainParams.colorPrimary;
        ctx.shadowBlur = 15;
        ctx.strokeStyle = brainParams.colorHighlight;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      ctx.restore();
      
      // Update and draw neurons
      neurons.forEach(neuron => {
        neuron.update();
        neuron.draw(ctx);
      });
      
      // Add overall glow
      ctx.globalCompositeOperation = 'lighter';
      ctx.beginPath();
      ctx.arc(brainParams.centerX, brainParams.centerY, brainParams.radius * pulseFactor, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(139, 92, 246, 0.05)';
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
      
      animationFrameId = requestAnimationFrame(drawBrain);
    };
    
    drawBrain();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-64 h-64 md:w-80 md:h-80"
      />
      
      {/* Orbiting elements */}
      <motion.div 
        className="absolute top-0 -left-8 w-16 h-16 bg-pink-500/90 rounded-full flex items-center justify-center shadow-lg"
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5 12.572L12 16.5L4.5 12.572M19.5 16.5L12 20.428L4.5 16.5M19.5 8.57143L12 12.5L4.5 8.57143L12 4.5L19.5 8.57143Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-10 -right-6 w-20 h-20 bg-indigo-600/90 rounded-full flex items-center justify-center shadow-lg"
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{ 
          duration: 6,
          delay: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2"/>
            <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="white" strokeWidth="2"/>
            <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="white" strokeWidth="2"/>
          </svg>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="absolute top-1/2 -right-10 w-14 h-14 bg-purple-500/90 rounded-full flex items-center justify-center shadow-lg"
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{ 
          duration: 6,
          delay: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3V4M12 20V21M21 12H20M4 12H3M18.364 5.63604L17.6569 6.34315M6.34315 17.6569L5.63604 18.364M18.364 18.364L17.6569 17.6569M6.34315 6.34315L5.63604 5.63604M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </motion.div>
      </motion.div>
      
      {/* Glowing rings */}
      <motion.div 
        className="absolute inset-0 -m-6 border-4 border-purple-500/20 rounded-full"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <motion.div 
        className="absolute inset-0 -m-12 border-4 border-indigo-500/10 rounded-full"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
    </motion.div>
  );
};

export default AnimatedBrain;