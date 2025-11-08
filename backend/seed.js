const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Module = require('./models/Module');
const Project = require('./models/Project');
const Resource = require('./models/Resource');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Module.deleteMany();
    await Project.deleteMany();
    await Resource.deleteMany();

    console.log('🗑️  Cleared existing data...');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@sustainable.com',
      password: 'admin123',
      role: 'admin'
    });

    // Create regular user
    const user = await User.create({
      name: 'John Doe',
      email: 'user@sustainable.com',
      password: 'user123',
      role: 'user'
    });

    console.log('✅ Users created!');

    // Create modules
    const modules = await Module.insertMany([
      {
        title: 'Introduction to Solar Energy',
        description: 'Learn the basics of solar energy and how it works',
        category: 'renewable-energy',
        difficulty: 'beginner',
        duration: 30,
        content: 'Solar energy is power obtained by harnessing the energy of the sun\'s rays. This renewable energy source has become increasingly popular as technology has advanced and costs have decreased. In this module, you\'ll learn about photovoltaic cells, solar panels, and how solar energy systems work.',
        videoUrl: 'https://www.youtube.com/watch?v=example',
        quiz: [
          {
            question: 'What is the main component of a solar panel?',
            options: ['Photovoltaic cells', 'Batteries', 'Mirrors', 'Wind turbines'],
            correctAnswer: 0,
            explanation: 'Photovoltaic cells convert sunlight directly into electricity.'
          },
          {
            question: 'Is solar energy renewable?',
            options: ['No', 'Yes', 'Sometimes', 'Only in summer'],
            correctAnswer: 1,
            explanation: 'Solar energy is completely renewable as the sun will continue to shine for billions of years.'
          }
        ],
        points: 10,
        carbonImpact: 5,
        createdBy: admin._id,
        published: true
      },
      {
        title: 'Wind Power Fundamentals',
        description: 'Discover how wind turbines generate clean electricity',
        category: 'renewable-energy',
        difficulty: 'beginner',
        duration: 25,
        content: 'Wind power harnesses the kinetic energy of moving air to generate electricity. Modern wind turbines are engineering marvels that can power thousands of homes. Learn about wind turbine components, offshore vs onshore wind farms, and the future of wind energy.',
        points: 10,
        carbonImpact: 4,
        createdBy: admin._id,
        published: true
      },
      {
        title: 'Zero Waste Living',
        description: 'Practical strategies to reduce your waste footprint',
        category: 'waste-reduction',
        difficulty: 'intermediate',
        duration: 40,
        content: 'Zero waste living is about reducing what we need, reusing what we can, and recycling what we must. This module covers the 5 Rs: Refuse, Reduce, Reuse, Recycle, and Rot. Learn practical tips for everyday life.',
        points: 15,
        carbonImpact: 8,
        createdBy: admin._id,
        published: true
      },
      {
        title: 'Composting 101',
        description: 'Turn food scraps into nutrient-rich soil',
        category: 'waste-reduction',
        difficulty: 'beginner',
        duration: 20,
        content: 'Composting is nature\'s way of recycling organic matter into valuable fertilizer. Learn about different composting methods, what you can and can\'t compost, and how to maintain a healthy compost bin.',
        points: 10,
        carbonImpact: 6,
        createdBy: admin._id,
        published: true
      },
      {
        title: 'Water Conservation at Home',
        description: 'Simple ways to save water in your daily routine',
        category: 'water-conservation',
        difficulty: 'beginner',
        duration: 30,
        content: 'Water is our most precious resource. Learn practical techniques to reduce water consumption at home, from fixing leaks to choosing water-efficient appliances.',
        points: 10,
        carbonImpact: 3,
        createdBy: admin._id,
        published: true
      },
      {
        title: 'Sustainable Transportation',
        description: 'Reduce your carbon footprint through smart travel choices',
        category: 'transportation',
        difficulty: 'intermediate',
        duration: 35,
        content: 'Transportation is a major contributor to carbon emissions. Explore alternatives like cycling, public transit, carpooling, and electric vehicles. Learn how your travel choices impact the environment.',
        points: 15,
        carbonImpact: 10,
        createdBy: admin._id,
        published: true
      }
    ]);

    console.log('✅ Modules created!');

    // Create projects
    const projects = await Project.insertMany([
      {
        title: 'Build a Rain Barrel',
        description: 'Collect rainwater for gardening and reduce water bills',
        category: 'water',
        difficulty: 'medium',
        timeRequired: 120,
        materials: [
          { name: 'Large barrel (55 gallon)', quantity: '1' },
          { name: 'Spigot', quantity: '1' },
          { name: 'Screen mesh', quantity: '1 sq ft' },
          { name: 'Drill with bits', quantity: '1' },
          { name: 'Silicone sealant', quantity: '1 tube' }
        ],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Clean the barrel thoroughly with soap and water',
            tip: 'Make sure the barrel is food-grade if possible'
          },
          {
            stepNumber: 2,
            instruction: 'Drill a hole near the bottom for the spigot',
            tip: 'Position it high enough to fit a watering can underneath'
          },
          {
            stepNumber: 3,
            instruction: 'Install the spigot using silicone sealant for a watertight seal',
            tip: 'Let the sealant dry for 24 hours before use'
          },
          {
            stepNumber: 4,
            instruction: 'Cut a hole in the top and install screen mesh to keep debris out',
            tip: 'The mesh prevents mosquitoes from breeding in the water'
          }
        ],
        estimatedCost: '$30-50',
        carbonImpact: 15,
        points: 20,
        tags: ['water conservation', 'gardening', 'diy'],
        createdBy: admin._id,
        published: true
      },
      {
        title: 'DIY Beeswax Food Wraps',
        description: 'Replace plastic wrap with reusable, eco-friendly alternative',
        category: 'recycling',
        difficulty: 'easy',
        timeRequired: 30,
        materials: [
          { name: 'Cotton fabric', quantity: 'Various sizes' },
          { name: 'Beeswax pellets', quantity: '2 cups' },
          { name: 'Parchment paper', quantity: '1 roll' },
          { name: 'Baking sheet', quantity: '1' },
          { name: 'Paintbrush', quantity: '1' }
        ],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Cut cotton fabric into desired sizes',
            tip: 'Common sizes: 8x8", 10x10", 12x12"'
          },
          {
            stepNumber: 2,
            instruction: 'Place fabric on parchment paper on baking sheet',
            tip: 'Preheat oven to 185°F (85°C)'
          },
          {
            stepNumber: 3,
            instruction: 'Sprinkle beeswax pellets evenly over fabric',
            tip: 'Use about 1-2 tablespoons per wrap'
          },
          {
            stepNumber: 4,
            instruction: 'Place in oven until wax melts (about 5 minutes)',
            tip: 'Watch carefully to avoid overheating'
          },
          {
            stepNumber: 5,
            instruction: 'Remove and hang to dry for 1-2 minutes',
            tip: 'Wraps will be ready to use once cooled'
          }
        ],
        estimatedCost: '$15-25',
        carbonImpact: 8,
        points: 15,
        tags: ['zero waste', 'kitchen', 'reusable'],
        createdBy: admin._id,
        published: true
      },
      {
        title: 'Create a Vertical Garden',
        description: 'Grow your own herbs and vegetables in small spaces',
        category: 'gardening',
        difficulty: 'medium',
        timeRequired: 180,
        materials: [
          { name: 'Wooden pallets', quantity: '1-2' },
          { name: 'Landscape fabric', quantity: '2 yards' },
          { name: 'Staple gun', quantity: '1' },
          { name: 'Potting soil', quantity: '1 bag' },
          { name: 'Plants or seeds', quantity: 'Various' }
        ],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Sand and treat the pallet if needed',
            tip: 'Use pallets marked "HT" (heat-treated) not "MB" (chemical-treated)'
          },
          {
            stepNumber: 2,
            instruction: 'Attach landscape fabric to back and bottom',
            tip: 'This creates pockets to hold soil'
          },
          {
            stepNumber: 3,
            instruction: 'Fill pockets with potting soil',
            tip: 'Leave space for plant roots'
          },
          {
            stepNumber: 4,
            instruction: 'Plant herbs, vegetables, or flowers',
            tip: 'Choose plants with similar water and light needs'
          }
        ],
        estimatedCost: '$20-40',
        carbonImpact: 12,
        points: 25,
        tags: ['gardening', 'food', 'upcycling'],
        createdBy: admin._id,
        published: true
      },
      {
        title: 'Compost Bin from Pallets',
        description: 'Build a sturdy compost bin using reclaimed wood',
        category: 'composting',
        difficulty: 'medium',
        timeRequired: 150,
        materials: [
          { name: 'Wooden pallets', quantity: '3-4' },
          { name: 'Screws or nails', quantity: '20-30' },
          { name: 'Drill or hammer', quantity: '1' },
          { name: 'Wire mesh', quantity: 'Optional' }
        ],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Stand three pallets on their sides to form three walls',
            tip: 'Leave one side open for easy access'
          },
          {
            stepNumber: 2,
            instruction: 'Secure pallets together with screws or nails',
            tip: 'Make sure the structure is stable'
          },
          {
            stepNumber: 3,
            instruction: 'Optional: Add wire mesh to the gaps between slats',
            tip: 'This helps keep the compost contained'
          },
          {
            stepNumber: 4,
            instruction: 'Start adding your compost materials!',
            tip: 'Layer green and brown materials for best results'
          }
        ],
        estimatedCost: '$0-30',
        carbonImpact: 20,
        points: 20,
        tags: ['composting', 'recycling', 'garden'],
        createdBy: admin._id,
        published: true
      }
    ]);

    console.log('✅ Projects created!');

    // Create resources
    const resources = await Resource.insertMany([
      {
        title: 'Complete Guide to Solar Panel Installation',
        description: 'Everything you need to know about installing solar panels',
        type: 'guide',
        category: 'renewable-energy',
        content: 'Comprehensive guide covering costs, permits, installation process, and maintenance of residential solar systems.',
        tags: ['solar', 'renewable energy', 'installation'],
        createdBy: admin._id,
        published: true
      },
      {
        title: 'Carbon Footprint Calculator',
        description: 'Calculate your personal carbon footprint',
        type: 'calculator',
        category: 'general',
        url: 'https://calculator.carbonfootprint.com/',
        content: 'Interactive tool to measure your carbon emissions from daily activities.',
        tags: ['carbon', 'calculator', 'measurement'],
        createdBy: admin._id,
        published: true
      },
      {
        title: 'Plastic-Free Living Checklist',
        description: 'Step-by-step guide to reducing plastic use',
        type: 'guide',
        category: 'waste-reduction',
        content: 'Practical checklist for eliminating single-use plastics from your life.',
        tags: ['plastic-free', 'zero waste', 'checklist'],
        createdBy: admin._id,
        published: true
      },
      {
        title: 'Sustainable Fashion Guide',
        description: 'Make eco-friendly clothing choices',
        type: 'article',
        category: 'eco-lifestyle',
        content: 'Learn about sustainable fabrics, ethical brands, and how to build a minimalist wardrobe.',
        tags: ['fashion', 'sustainable', 'clothing'],
        createdBy: admin._id,
        published: true
      },
      {
        title: 'Home Energy Audit Infographic',
        description: 'Visual guide to reducing home energy consumption',
        type: 'infographic',
        category: 'renewable-energy',
        content: 'Easy-to-follow infographic showing how to identify and fix energy waste in your home.',
        tags: ['energy', 'home', 'audit'],
        createdBy: admin._id,
        published: true
      }
    ]);

    console.log('✅ Resources created!');

    console.log(`
    ╔════════════════════════════════════════════════╗
    ║                                                ║
    ║  🎉 Database seeded successfully!              ║
    ║                                                ║
    ║  👥 Users: 2 (1 admin, 1 user)                 ║
    ║  📚 Modules: ${modules.length}                                  ║
    ║  🛠️  Projects: ${projects.length}                                 ║
    ║  📖 Resources: ${resources.length}                                ║
    ║                                                ║
    ║  Login Credentials:                            ║
    ║  Admin: admin@sustainable.com / admin123       ║
    ║  User:  user@sustainable.com / user123         ║
    ║                                                ║
    ╚════════════════════════════════════════════════╝
    `);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
