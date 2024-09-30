import { v4 as uuidv4 } from 'uuid';
import { HeaderImages, Category } from './types'; // Your custom types

// Header images data
export const headerImages: HeaderImages[] = [
    { id: uuidv4(), url: '/headerImages/sword-1.jpg', article: 'Swords' },
    { id: uuidv4(), url: '/headerImages/AXE-1.jpg', article: 'Axes' },
    { id: uuidv4(), url: '/headerImages/Kitchenknives-1.jpg', article: 'Kitchen knives' },
    { id: uuidv4(), url: '/headerImages/HuntingKnifes.jpg', article: 'Hunting knives' },
    { id: uuidv4(), url: '/headerImages/dental.jpg', article: 'Dental Instruments' },
    { id: uuidv4(), url: '/headerImages/beautiInstrument.webp', article: 'Beauty Instruments' },
];

export const categories: Category[] = [
    {
        id: uuidv4(),
        name: 'Swords',
        subcategories: [
            {
                id: uuidv4(),
                name: 'Combat Swords',
                products: [
                    {
                        id: uuidv4(),
                        name: 'Viking Sword',
                        shortDescription: 'A sharp and sturdy Viking-style sword.',
                        price: 250,
                        imageUrl: ['/axe.webp','/headerImages/beautiInstrument.webp','/axe.webp','/axe.webp','/axe.webp','/axe.webp'],
                        quantity: 5,
                        tag: ['Hot Selling', 'Discount'],
                        productDetails: {
                            description: 'This premium chef knife is designed for precision and comfort, making it ideal for both professional chefs and home cooks.',
                            bladeLength: '8 inches',
                            bladeMaterial: 'High-carbon stainless steel',
                            handleLength: '4.5 inches',
                            handleMaterial: 'Ergonomic Pakkawood',
                            totalLength: '12.5 inches',
                          },
                        comments: [
                            {
                                id: uuidv4(),
                                user: 'Emily Johnson',
                                comment: 'Amazing quality sword! Very sharp and durable.',
                                rating: 5,

                            },
                        ]
                    },
                ]
            }
        ]
    },
    {
        id: uuidv4(),
        name: 'Axes',
        subcategories: [
            {
                id: uuidv4(),
                name: 'Throwing Axes',
                products: [
                    {
                        id: uuidv4(),
                        name: 'Throwing Axe',
                        shortDescription: 'A durable throwing axe perfect for sports and competition.',
                        price: 150,
                        imageUrl: ['https://via.placeholder.com/150'],
                        quantity: 8,
                        tag: ['New Arrival', 'Featured'],
                        comments: [
                            {
                                id: uuidv4(),
                                user: 'Jane Smith',
                                comment: 'Perfect for throwing! Balanced and strong.',
                                rating: 4,

                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: uuidv4(),
        name: 'Kitchen Knives',
        subcategories: [
            {
                id: uuidv4(),
                name: 'Chef’s Knives',
                products: [
                    {
                        id: uuidv4(),
                        name: 'Chef’s Knife',
                        shortDescription: 'A high-quality chef’s knife for professional use.',
                        price: 120,
                        imageUrl: ['https://via.placeholder.com/150'],
                        quantity: 12,
                        tag: ['Featured', 'Hot Selling'],
                        comments: [
                            {
                                id: uuidv4(),
                                user: 'Emily Johnson',
                                comment: 'Best kitchen knife I’ve ever used!',
                                rating: 5,

                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: uuidv4(),
        name: 'Hunting Knives',
        subcategories: [
            {
                id: uuidv4(),
                name: 'Outdoor Hunting Knives',
                products: [
                    {
                        id: uuidv4(),
                        name: 'Hunting Knife',
                        shortDescription: 'A durable hunting knife designed for outdoor adventures.',
                        price: 100,
                        imageUrl: ['https://via.placeholder.com/150'],
                        quantity: 8,
                        tag: ['Outdoor', 'Featured'],
                        comments: [
                            {
                                id: uuidv4(),
                                user: 'Mark Thompson',
                                comment: 'Perfect for my camping trips!',
                                rating: 5,

                            }
                        ]
                    },
                ]
            }
        ]
    },
    {
        id: uuidv4(),
        name: 'Dental Instruments',
        subcategories: [
            {
                id: uuidv4(),
                name: 'Dental Kits',
                products: [
                    {
                        id: uuidv4(),
                        name: 'Dental Hygiene Kit',
                        shortDescription: 'Comprehensive dental hygiene kit for home use.',
                        price: 50,
                        imageUrl:[ 'https://via.placeholder.com/150'],
                        quantity: 15,
                        tag: ['Best Seller'],
                        comments: [
                            {
                                id: uuidv4(),
                                user: 'Sarah Lee',
                                comment: 'Great kit! Everything I need for dental care.',
                                rating: 5,
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: uuidv4(),
        name: 'Beauty Instruments',
        subcategories: [
            {
                id: uuidv4(),
                name: 'Facial Tools',
                products: [
                    {
                        id: uuidv4(),
                        name: 'Facial Roller',
                        shortDescription: 'A jade facial roller for smoother skin.',
                        price: 30,
                        imageUrl: ['https://via.placeholder.com/150'],
                        quantity: 20,
                        tag: ['Popular'],
                        comments: [
                            {
                                id: uuidv4(),
                                user: 'Jessica Brown',
                                comment: 'Love this roller! It feels amazing on my skin.',
                                rating: 5,
                            }
                        ]
                    },
                ]
            }
        ]
    }
];