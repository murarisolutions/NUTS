<?php

namespace Database\Seeders;

use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            ['name' => 'Rajesh Sharma', 'location' => 'Bengaluru', 'rating' => 5.0, 'comment' => 'The quality of almonds and cashews from Nuts is exceptional. I have been ordering for over a year now, and the freshness and taste are consistently amazing. Highly recommended for anyone who values premium quality dry fruits!'],
            ['name' => 'Priya Menon', 'location' => 'Mumbai', 'rating' => 5.0, 'comment' => 'Ordered the gift box collection for Diwali and everyone loved it! The packaging was beautiful and the dry fruits were so fresh. Will definitely order again for all festive occasions.'],
            ['name' => 'Amit Kumar', 'location' => 'Delhi', 'rating' => 4.5, 'comment' => 'Great variety of seeds and berries. The breakfast mix has become a staple in our home. Fast delivery and excellent customer service. Very happy with my purchase.'],
            ['name' => 'Sarah Fatima', 'location' => 'Hyderabad', 'rating' => 5.0, 'comment' => 'The Ajwa dates are absolutely divine! Best quality I have found online. The packaging keeps everything fresh and the delivery was prompt. A wonderful shopping experience.'],
            ['name' => 'Vikram Reddy', 'location' => 'Bengaluru', 'rating' => 5.0, 'comment' => 'Being a fitness enthusiast, I rely on dry fruits for nutrition. Nuts offers the best quality walnuts and trail mix. Their products are truly premium and worth every rupee.'],
            ['name' => 'Neha Desai', 'location' => 'Pune', 'rating' => 4.5, 'comment' => 'Love the variety! From exotic berries to traditional makhana, they have everything. The bulk order option for our office was seamless. Great customer support team!'],
        ];

        foreach ($testimonials as $t) {
            Review::create([
                'reviewer_name' => $t['name'],
                'reviewer_location' => $t['location'],
                'rating' => $t['rating'],
                'comment' => $t['comment'],
                'is_approved' => true,
            ]);
        }
    }
}
