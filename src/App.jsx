import React from 'react'
import ShoppingCart from './components/ShoppingCart'
import WeatherDashboard from './components/WeatherDashboard';
import TaskManagement from './components/TaskManagement';
import SimpleTaskManagement from './components/SimpleTaskManagement';
import ShoppingApp from './components/AdvancedShoppingCart';
import { ShopProvider } from './components/AdvancedShoppingCart';
import {initialCartItems,initialTasks,project1SkillsLearned,
    project2SkillsLearned,project3SkillsLearned,project4SkillsLearned
} from './data/data';


function App() {
  // Add smooth scrolling behavior
  React.useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
    {/* Page Header - Title  */}
    <header className='bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 shadow-lg'>
      <div className='container mx-auto px-6 py-8 text-center'>
        <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
          <span className='mr-3'>💻</span>
          My React Learning Journey
          <span className='ml-3'>💻</span>
        </h1>
        <p className='text-slate-200 text-xl font-medium max-w-3xl mx-auto leading-relaxed'>
          A comprehensive showcase of my React development journey through hands-on projects and real-world applications
        </p>
      </div>
      
      {/* Learning Tools Section */}
      <div className='bg-white/10 backdrop-blur-sm border-t border-white/20'>
        <div className='container mx-auto px-6 py-6'>
          <h2 className='text-2xl font-bold text-white mb-6 text-center tracking-wide'>🛠️ Learning Resources & Development Tools</h2>
          <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto'>
            {/* React */}
            <div className='bg-white/20 hover:bg-white/30 text-white px-4 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center gap-2'>
              <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' alt='React' className='w-8 h-8' />
              <span className='text-xs font-medium'>React</span>
            </div>
            
            {/* Tailwind CSS */}
            <div className='bg-white/20 hover:bg-white/30 text-white px-4 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center gap-2'>
              <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' alt='Tailwind CSS' className='w-8 h-8' />
              <span className='text-xs font-medium'>Tailwind</span>
            </div>
            
            {/* Vite */}
            <div className='bg-white/20 hover:bg-white/30 text-white px-4 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center gap-2'>
              <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' alt='Vite' className='w-8 h-8' />
              <span className='text-xs font-medium'>Vite</span>
            </div>
            
            {/* Netlify */}
            <div className='bg-white/20 hover:bg-white/30 text-white px-4 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center gap-2'>
              <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg' alt='Netlify' className='w-8 h-8' />
              <span className='text-xs font-medium'>Netlify</span>
            </div>
            
            {/* GitHub */}
            <div className='bg-white/20 hover:bg-white/30 text-white px-4 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center gap-2'>
              <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' alt='GitHub' className='w-8 h-8' />
              <span className='text-xs font-medium'>GitHub</span>
            </div>
            
            {/* Git */}
            <div className='bg-white/20 hover:bg-white/30 text-white px-4 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center gap-2'>
              <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' alt='Git' className='w-8 h-8' />
              <span className='text-xs font-medium'>Git</span>
            </div>
            
            {/* VS Code */}
            <div className='bg-white/20 hover:bg-white/30 text-white px-4 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center gap-2'>
              <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' alt='VS Code' className='w-8 h-8' />
              <span className='text-xs font-medium'>VS Code</span>
            </div>
            
            {/* Claude AI */}
            <div className='bg-white/20 hover:bg-white/30 text-white px-4 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center gap-2'>
              <img src='https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/claude-ai-icon.svg' alt='Claude AI' className='w-8 h-8' />
              <span className='text-xs font-medium'>Claude AI</span>
            </div>
            
            {/* MDN */}
            <div className='bg-white/20 hover:bg-white/30 text-white px-4 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center gap-2'>
              <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firefox/firefox-original.svg' alt='MDN' className='w-8 h-8' />
              <span className='text-xs font-medium'>MDN</span>
            </div>
            
            {/* Node.js */}
            <div className='bg-white/20 hover:bg-white/30 text-white px-4 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center gap-2'>
              <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' alt='Node.js' className='w-8 h-8' />
              <span className='text-xs font-medium'>Node.js</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    {/* Projects Made Section */}
    <section className='py-16 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 border-b border-slate-200'>
      <div className='container mx-auto px-6'>
        <div className='max-w-4xl mx-auto text-center mb-12'>
          <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-6'>
            Projects Made
          </h2>
          <p className='text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto'>
            Explore the interactive React applications I've built during my learning journey. Each project demonstrates different concepts, patterns, and techniques in modern React development.
          </p>
        </div>
        
        {/* Project Navigation Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
          <a 
            href='#project-1'
            className='group bg-white hover:bg-slate-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-200'
          >
            <div className='flex items-center gap-4 mb-4'>
              <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-2xl shadow-md'>
                🛒
              </div>
              <div>
                <h3 className='text-xl font-bold text-slate-800 group-hover:text-slate-900'>Shopping Cart</h3>
                <span className='text-sm text-slate-500 font-medium'>Basic React Hooks</span>
              </div>
            </div>
            <p className='text-slate-600 text-sm leading-relaxed'>
              Interactive shopping cart with state management and dynamic calculations using React hooks.
            </p>
          </a>

          <a 
            href='#project-2'
            className='group bg-white hover:bg-slate-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-200'
          >
            <div className='flex items-center gap-4 mb-4'>
              <div className='w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-2xl shadow-md'>
                🌤️
              </div>
              <div>
                <h3 className='text-xl font-bold text-slate-800 group-hover:text-slate-900'>Weather Dashboard</h3>
                <span className='text-sm text-slate-500 font-medium'>API Integration</span>
              </div>
            </div>
            <p className='text-slate-600 text-sm leading-relaxed'>
              Real-time weather dashboard with API integration, useEffect hooks, and data fetching patterns.
            </p>
          </a>

          <a 
            href='#project-3'
            className='group bg-white hover:bg-slate-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-200'
          >
            <div className='flex items-center gap-4 mb-4'>
              <div className='w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-2xl shadow-md'>
                ✅
              </div>
              <div>
                <h3 className='text-xl font-bold text-slate-800 group-hover:text-slate-900'>Task Management</h3>
                <span className='text-sm text-slate-500 font-medium'>Custom Hooks</span>
              </div>
            </div>
            <p className='text-slate-600 text-sm leading-relaxed'>
              Advanced task manager with custom hooks, localStorage persistence, and complex state logic.
            </p>
          </a>

          <a 
            href='#project-4'
            className='group bg-white hover:bg-slate-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-200'
          >
            <div className='flex items-center gap-4 mb-4'>
              <div className='w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center text-2xl shadow-md'>
                🏪
              </div>
              <div>
                <h3 className='text-xl font-bold text-slate-800 group-hover:text-slate-900'>Advanced Shopping</h3>
                <span className='text-sm text-slate-500 font-medium'>Context API & useReducer</span>
              </div>
            </div>
            <p className='text-slate-600 text-sm leading-relaxed'>
              Complex e-commerce app with Context API, useReducer, and advanced state management patterns.
            </p>
          </a>
        </div>
      </div>
    </section>

    {/* Project 1: Shopping Cart */}
    <section id='project-1' className='relative py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100 overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
      
      <div className='relative container mx-auto px-6'>
        <div className='max-w-6xl mx-auto'>
          {/* Project header with enhanced design */}
          <div className='text-center mb-16'>
            <div className='inline-flex items-center justify-center bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-8 py-4 rounded-2xl text-lg font-bold mb-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105'>
              PROJECT 01
            </div>
            <h2 className='text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-8 leading-tight tracking-tight'>
              Shopping Cart
            </h2>
            <p className='text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium'>
              Interactive shopping cart with <span className='font-bold text-slate-700'>state management</span> and <span className='font-bold text-slate-800'>dynamic calculations</span>
            </p>
            <div className='flex flex-wrap justify-center gap-4 mt-10'>
              <span className='bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-2xl text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105'>React Hooks</span>
              <span className='bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-3 rounded-2xl text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105'>State Management</span>
              <span className='bg-slate-300 hover:bg-slate-400 text-slate-900 px-6 py-3 rounded-2xl text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105'>Dynamic UI</span>
            </div>
          </div>
          
          {/* Project container with enhanced styling */}
          <div className='bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm'>
            <div className='bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <div className='w-3 h-3 bg-red-400 rounded-full'></div>
                  <div className='w-3 h-3 bg-yellow-400 rounded-full'></div>
                  <div className='w-3 h-3 bg-green-400 rounded-full'></div>
                </div>
                <span className='text-sm text-gray-500 font-mono'>ShoppingCart.jsx</span>
              </div>
            </div>
            <div className='p-8'>
              <ShoppingCart initialItems={initialCartItems}/>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Project 1: Shopping Cart - Skills Learned */}
    <div className='py-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100'>
      <div className='container mx-auto px-6'>
        <SkillsLearned skills={project1SkillsLearned} />
      </div>
    </div>

    {/* Project 2: Weather Dashboard */}
    <section id='project-2' className='relative py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-100 overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute top-10 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce'></div>
      <div className='absolute bottom-10 left-10 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
      
      <div className='relative container mx-auto px-6'>
        <div className='max-w-6xl mx-auto'>
          {/* Project header */}
          <div className='text-center mb-16'>
            <div className='inline-flex items-center justify-center bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-8 py-4 rounded-2xl text-lg font-bold mb-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105'>
              PROJECT 02
            </div>
            <h2 className='text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-8 leading-tight tracking-tight'>
              Weather Dashboard
            </h2>
            <p className='text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium'>
              <span className='font-bold text-slate-700'>API integration</span> with useEffect and <span className='font-bold text-slate-800'>real-time data fetching</span>
            </p>
            <div className='flex flex-wrap justify-center gap-4 mt-10'>
              <span className='bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-2xl text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105'>API Integration</span>
              <span className='bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-3 rounded-2xl text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105'>useEffect</span>
              <span className='bg-slate-300 hover:bg-slate-400 text-slate-900 px-6 py-3 rounded-2xl text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105'>Real-time Data</span>
            </div>
          </div>
          
          {/* Project container */}
          <div className='bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm'>
            <div className='bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <div className='w-3 h-3 bg-red-400 rounded-full'></div>
                  <div className='w-3 h-3 bg-yellow-400 rounded-full'></div>
                  <div className='w-3 h-3 bg-green-400 rounded-full'></div>
                </div>
                <span className='text-sm text-gray-500 font-mono'>WeatherDashboard.jsx</span>
              </div>
            </div>
            <div className='p-8'>
              <WeatherDashboard />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Project 2: Weather Dashboard - Skills Learned */}
    <div className='py-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-100'>
      <div className='container mx-auto px-6'>
        <SkillsLearned skills={project2SkillsLearned} />
      </div>
    </div>

    {/* Project 3: Task Management */}
    <section id='project-3' className='relative py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-slate-100 overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute top-0 left-1/4 w-64 h-64 bg-violet-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
      <div className='absolute bottom-0 right-1/4 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce'></div>
      
      <div className='relative container mx-auto px-6'>
        <div className='max-w-6xl mx-auto'>
          {/* Project header */}
          <div className='text-center mb-16'>
            <div className='inline-flex items-center justify-center bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-8 py-4 rounded-2xl text-lg font-bold mb-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105'>
              PROJECT 03
            </div>
            <h2 className='text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-8 leading-tight tracking-tight'>
              Task Management
            </h2>
            <p className='text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium'>
              <span className='font-bold text-slate-700'>Custom hooks</span>, localStorage persistence, and <span className='font-bold text-slate-800'>advanced React patterns</span>
            </p>
            <div className='flex flex-wrap justify-center gap-4 mt-10'>
              <span className='bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-2xl text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105'>Custom Hooks</span>
              <span className='bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-3 rounded-2xl text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105'>localStorage</span>
              <span className='bg-slate-300 hover:bg-slate-400 text-slate-900 px-6 py-3 rounded-2xl text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105'>Advanced Patterns</span>
            </div>
          </div>
          
          {/* Project container */}
          <div className='bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm'>
            <div className='bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <div className='w-3 h-3 bg-red-400 rounded-full'></div>
                  <div className='w-3 h-3 bg-yellow-400 rounded-full'></div>
                  <div className='w-3 h-3 bg-green-400 rounded-full'></div>
                </div>
                <span className='text-sm text-gray-500 font-mono'>TaskManagement.jsx</span>
              </div>
            </div>
            <div className='p-8'>
              <TaskManagement initialTasks={initialTasks} />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Project 3: Task Management - Skills Learned */}
    <div className='py-8 bg-gradient-to-br from-violet-50 via-purple-50 to-slate-100'>
      <div className='container mx-auto px-6'>
        <SkillsLearned skills={project3SkillsLearned} />
      </div>
    </div>

    {/* Project 4: Advanced Shopping Cart */}
    <section id='project-4' className='relative py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-slate-100 overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute top-20 right-20 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
      <div className='absolute bottom-20 left-20 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce'></div>
      
      <div className='relative container mx-auto px-6'>
        <div className='max-w-7xl mx-auto'>
          {/* Project header */}
          <div className='text-center mb-16'>
            <div className='inline-flex items-center justify-center bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-8 py-4 rounded-2xl text-lg font-bold mb-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105'>
              PROJECT 04 • ADVANCED
            </div>
            <h2 className='text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-8 leading-tight tracking-tight'>
              Advanced Shopping Cart
            </h2>
            <p className='text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium'>
              <span className='font-bold text-slate-700'>Context API</span>, useReducer, and <span className='font-bold text-slate-800'>complex state management</span> patterns
            </p>
            <div className='flex flex-wrap justify-center gap-4 mt-10'>
              <span className='bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-2xl text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105'>Context API</span>
              <span className='bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-3 rounded-2xl text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105'>useReducer</span>
              <span className='bg-slate-300 hover:bg-slate-400 text-slate-900 px-6 py-3 rounded-2xl text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105'>Complex State</span>
            </div>
          </div>
          
          {/* Project container */}
          <div className='bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm'>
            <div className='bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <div className='w-3 h-3 bg-red-400 rounded-full'></div>
                  <div className='w-3 h-3 bg-yellow-400 rounded-full'></div>
                  <div className='w-3 h-3 bg-green-400 rounded-full'></div>
                </div>
                <span className='text-sm text-gray-500 font-mono'>AdvancedShoppingCart.jsx</span>
              </div>
            </div>
            <div className='p-8'>
              <ShopProvider>
                <ShoppingApp />
              </ShopProvider>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Project 4: Advanced Shopping Cart - Skills Learned */}
    <div className='py-8 bg-gradient-to-br from-orange-50 via-amber-50 to-slate-100'>
      <div className='container mx-auto px-6'>
        <SkillsLearned skills={project4SkillsLearned} />
      </div>
    </div>

    <footer className='bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white'>
      <div className='container mx-auto px-6 py-16'>
        <div className='text-center'>
          <div className='mb-8'>
            <h3 className='text-3xl font-bold mb-4 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent'>Sotiris Demertzis</h3>
            <p className='text-slate-300 text-lg font-medium mb-6'>React Developer • Software Engineer • Continuous Learner</p>
            <div className='flex flex-wrap justify-center gap-6 text-base'>
              <span className='text-slate-400 bg-slate-700/50 px-4 py-2 rounded-xl backdrop-blur-sm border border-slate-600/50'>🎯 Goal: Master Modern React</span>
              <span className='text-slate-400 bg-slate-700/50 px-4 py-2 rounded-xl backdrop-blur-sm border border-slate-600/50'>🚀 Journey: Continuous Learning</span>
              <span className='text-slate-400 bg-slate-700/50 px-4 py-2 rounded-xl backdrop-blur-sm border border-slate-600/50'>💻 Building Real Applications</span>
            </div>
          </div>
          <div className='border-t border-slate-700 pt-8'>
            <p className='text-slate-400 text-base font-medium'>
              Crafted with ❤️, dedication, and modern web technologies • Learning React Projects © 2025
            </p>
          </div>
        </div>
      </div>
    </footer>

    </>
  )
}
export default App

function SkillsLearned({ skills }) {
  return (
    <div className='bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm max-w-4xl mx-auto mb-10'>
      <div className='bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <div className='w-3 h-3 bg-red-400 rounded-full'></div>
            <div className='w-3 h-3 bg-yellow-400 rounded-full'></div>
            <div className='w-3 h-3 bg-green-400 rounded-full'></div>
          </div>
          <span className='text-sm text-gray-500 font-mono'>Skills.md</span>
        </div>
      </div>
      <div className='p-8'>
        <h3 className='text-2xl font-bold mb-6 text-slate-800 text-center'>Skills Learned</h3>
        <ul className='space-y-3 text-left'>

        {skills.map((skill, index) => {
          if (skill.details && skill.details.length > 0) {
            return (
              <li key={index} className='mb-2'>✅ <span className='font-bold'>{skill.title}</span>
                <ul className='list-disc ml-5'>
                  {skill.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>{detail.title}</li>
                  ))}
                </ul>
              </li>
            );
          }
          return (
            <li key={index}>✅ <span className='font-bold'>{skill.title}</span> : {skill.description}</li>
          );
        })}
        </ul>
      </div>
    </div>
  )
}

