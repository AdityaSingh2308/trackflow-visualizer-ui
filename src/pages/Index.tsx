
import React from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Index = () => {
  // Example tracking ID for demo purposes
  const demoTrackingId = "TRK293847562";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navigation />
      <div className="container max-w-6xl py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Package Tracking Portal</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Track your shipment in real-time with our advanced tracking system
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to={`/tracking/${demoTrackingId}`}>
              <Button size="lg" className="bg-tracking-blue hover:bg-blue-600">
                Track Demo Package
              </Button>
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-12"
          >
            <img 
              src="/placeholder.svg" 
              alt="Shipping illustration" 
              className="max-w-md mx-auto rounded-lg shadow-lg" 
            />
          </motion.div>
        </motion.div>
      </div>
      
      <footer className="py-6 border-t border-slate-200 dark:border-slate-700 backdrop-blur-sm bg-white/50 dark:bg-slate-800/50">
        <div className="container max-w-6xl flex items-center justify-center">
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
            <span>© {new Date().getFullYear()} Geofleet.ai. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
