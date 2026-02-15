import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create Brands
  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { slug: 'sabyasachi' },
      update: {},
      create: {
        name: 'Sabyasachi',
        slug: 'sabyasachi',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACLA4f7buYJb5bLWAcq7YlgGPECBACSssw-_Hcosf8fA_rOPSs27XhRJE9Ub4XUDQrvx7KyndlG2pJC_Cb0aXrlQKYQf1unFMrE7CFg9cnoX9Ej9BtCQwQJ7t3JUUb61xMcjVVSfvEcQmidDQS0ThLGGtmbSC8L3ANcSiJMhJqeZKF2Hb4CUpvmHXGR3rXcZfWGDIZzpjjrnuyHvhcrFFFLHSVEb1OmlLjPd0MAxWCBf8DWsQGmhB9VghnDqs0o75_H0PyC-RxxjRW',
        description: 'Sabyasachi - The king of ethnic wear',
        website: 'https://sabyasachi.com',
        isActive: true,
        isFeatured: true,
        sortOrder: 1,
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'manish-malhotra' },
      update: {},
      create: {
        name: 'Manish Malhotra',
        slug: 'manish-malhotra',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2d1pBBTI5Ca4FrpOQ4FVuJvYXerTVWroRubJ6Bocm66QtVD3IrS1VMglKiJHnZUHbfL2vR7RTQxYi_Mdt6okIDc4Dq4KHiR7qeLWNV-ctXeNSAe2vwDsf6MxiMUhuuXqKHcaU2rAD5xhTlp_KGL5dCBT3ASbyBU2Gh2xQXVhu6XpYj5mlrxoJc-nzLs9oWXClELvb6yR_ZDzqv7zSyjNPeCGaIGKPtg5NLVxDd5bxkN_KvLgSiBjavrPFhKXgR13SLBWLrZDRAp0x',
        description: 'Manish Malhotra - Bollywood favorite',
        website: 'https://manishmalhotra.com',
        isActive: true,
        isFeatured: true,
        sortOrder: 2,
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'anita-dongre' },
      update: {},
      create: {
        name: 'Anita Dongre',
        slug: 'anita-dongre',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSEzZ9rHpzU8ngSriArgwqy4ClXoKkIU4x6zeUw5xdzTzxBa-bGMle4av0EKPsUUZv8Wb4hb8W_NMYFLu8A7Z3Ajq-CDcsJlMNB7beZecy1M0gDP7xrzF1DlE56hMxlJ8GiQ7sXdDzdLFJMnGI4iCH2Sxp0Mub6veGJXTEZtaCQhZbjw4mFTgecY3jNAtKEw8VN-SO3E53CeP5VaUgspv6R-OLnjZZbonWj2uHg22dM157YuWkjt9pBSR05Xo74gx-7En8-xRT1951',
        description: 'Anita Dongre - Sustainable ethnic fashion',
        website: 'https://anitadongre.com',
        isActive: true,
        isFeatured: true,
        sortOrder: 3,
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'ritu-kumar' },
      update: {},
      create: {
        name: 'Ritu Kumar',
        slug: 'ritu-kumar',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlGSoeAxElB4gBZAReOa5shNbfPbQskdMZyyEZsF6TS6w5CPH5eTxjMO8M82D4cxjZT1hm8aHvyKvDb4zmiyxg6fOvQu4kTAXG3I6jgYD6YSoRhl-WD0Bh-ubdbXpzhdMvIC95zqzS7Hz3CKurDjKAzKUJFXYnOSazV_AggDClIThEANZLDD8FJsU-yDKOtko4V4C_viNkNC6AYrGd0zUxfWo2FjJwJRnuBfF5Y2amkjwn01VuKTqDVoHZF5M2QayQsmjl6yh5w_73',
        description: 'Ritu Kumar - Luxury pret',
        website: 'https://ritukumar.com',
        isActive: true,
        isFeatured: true,
        sortOrder: 4,
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'manyavar' },
      update: {},
      create: {
        name: 'Manyavar',
        slug: 'manyavar',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMQ8f7buYJb5bLWAcq7YlgGPECBACSssw-_Hcosf8fA_rOPSs27XhRJE9Ub4XUDQrvx7KyndlG2pJC_Cb0aXrlQKYQf1unFMrE7CFg9cnoX9Ej9BtCQwQJ7t3JUUb61xMcjVVSfvEcQmidDQS0ThLGGtmbSC8L3ANcSiJMhJqeZKF2Hb4CUpvmHXGR3rXcZfWGDIZzpjjrnuyHvhcrFFFLHSVEb1OmlLjPd0MAxWCBf8DWsQGmhB9VghnDqs0o75_H0PyC-RxxjRW',
        description: 'Manyavar - Mens ethnic wear',
        website: 'https://manyavar.com',
        isActive: true,
        isFeatured: true,
        sortOrder: 5,
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'tarun-tahiliani' },
      update: {},
      create: {
        name: 'Tarun Tahiliani',
        slug: 'tarun-tahiliani',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyOLK-48dT1qE3G1is_ymRuOKYXgBBgEbvP2mq2WFa015fy5bg3E2bQqn8vvy0Lgo0TRY9zmVx3PykkOR3QG2fkUtH8oqt-RwbU_YnntlOd7R_LFRPDDzaeRJF1pHFCUbksPf7PO0JACBD3_TLRaViY0lYpTaZG_qBwuPvuQp8-L4jZWWy-SFF1j1cLurtF8ychBvngWtW22Kr2AYjq9FuA-LNzxNOTfUnWafh8MjtSk8ugP7RYh97k7FGJS8etLQlabGEJiL5VcYM',
        description: 'Tarun Tahiliani - Bridge to luxury',
        website: 'https://taruntahiliani.com',
        isActive: true,
        isFeatured: true,
        sortOrder: 6,
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'raghavendra-rathore' },
      update: {},
      create: {
        name: 'Raghavendra Rathore',
        slug: 'raghavendra-rathore',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHjfJj_iXLpPRIwZzWf6eO0ggFjYd1D98m-qyVUE50CRAHpWajBDJlfUZIPQCDWsjgTwXfODyYkaJ82_TMP6ytUXgVTSQ9dSKtOz9PzLzrSeSVCBMFtqU1HBNCsD_NwkeIvbJ-eKXYtyhMQ6m7dPe9OqntvTUtcX7iwI45weT4JsYjfpro9p3P5Gw2TasfgME1DzCJBFxJfDYRpjXfr4yYhC7RsYCaKSPrYSYhMbaLRyBoGav6L--IJ7Idg4gI1OVsfLsxSSyN8eXD',
        description: 'Raghavendra Rathore - Bandhgala king',
        website: 'https://raghavendra-rathore.com',
        isActive: true,
        isFeatured: false,
        sortOrder: 7,
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'anushree-reddy' },
      update: {},
      create: {
        name: 'Anushree Reddy',
        slug: 'anushree-reddy',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj8DdxsG1ihKYMvMNAds0_JQuQxs3bM1T2YS7kQ9c77JIlkHpuqT7raP19bQD3lrE5wHqtAX345X_WA9xnoeza9ODcAUhC_ijGDjOCOyNLrW6bu7w7M0lzdlYFZwQ2pctXBF0UzFgFGzMght3fvCCOqozcrMXrJUQv5h6G9dUIZ_4nXbuMR31hz4jWI3sR_hJqIjndd_rnSVe2TvP1HeyutRRkjwtOvP_-eKofY53QACBe0AE3ORkOgp_A1eiRFqJI3zJ0WZCSkLHr',
        description: 'Anushree Reddy - Modern ethnic',
        website: 'https://anushreereddy.com',
        isActive: true,
        isFeatured: false,
        sortOrder: 8,
      },
    }),
  ])

  console.log(`Created ${brands.length} brands`)

  // Create Banners
  const banners = await Promise.all([
    prisma.banner.upsert({
      where: { id: 'banner-1' },
      update: {},
      create: {
        id: 'banner-1',
        title: 'CULTURE CUPID SALE IS BACK',
        subtitle: 'Get Upto 75% Off On Your Favourite Ethnic Wear',
        image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2670&auto=format&fit=crop',
        link: '/categories/wedding',
        position: 'home',
        isActive: true,
        sortOrder: 1,
      },
    }),
    prisma.banner.upsert({
      where: { id: 'banner-2' },
      update: {},
      create: {
        id: 'banner-2',
        title: 'Eco-Friendly Fashion',
        subtitle: 'Rent, Wear, Return - Save the Environment',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAECJGPLNxbR5hpiPk6g0d6230rHZfKK9Tqz9cj2bBJ9ZlNu860Ax9TL7RCL1A67ARiTN3jfF8xcXC9HByblSdtFD99noy-RAZC33mn1b7vZtAkonJ-BX2JcP3npfq5jAMSOTFtwfA9sxkfxNTacmuLN7P29HPup50GRSYZAT54cHDaZc5M18A4ZT12mezn6iPUbOQxjIqr4OjVa8T83AAIiig4pOewCl6Y0Nxu6IYlcAwdqwMIIMeGW2b_4eklQZlfES3Pm-2c8ViC',
        link: '/categories/party',
        position: 'home',
        isActive: true,
        sortOrder: 2,
      },
    }),
    prisma.banner.upsert({
      where: { id: 'banner-3' },
      update: {},
      create: {
        id: 'banner-3',
        title: 'Premium Ethnic Wear',
        subtitle: 'For Every Occasion',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2d1pBBTI5Ca4FrpOQ4FVuJvYXerTVWroRubJ6Bocm66QtVD3IrS1VMglKiJHnZUHbfL2vR7RTQxYi_Mdt6okIDc4Dq4KHiR7qeLWNV-ctXeNSAe2vwDsf6MxiMUhuuXqKHcaU2rAD5xhTlp_KGL5dCBT3ASbyBU2Gh2xQXVhu6XpYj5mlrxoJc-nzLs9oWXClELvb6yR_ZDzqv7zSyjNPeCGaIGKPtg5NLVxDd5bxkN_KvLgSiBjavrPFhKXgR13SLBWLrZDRAp0x',
        link: '/categories/formal',
        position: 'home',
        isActive: true,
        sortOrder: 3,
      },
    }),
    prisma.banner.upsert({
      where: { id: 'banner-4' },
      update: {},
      create: {
        id: 'banner-4',
        title: 'Designer Lehengas',
        subtitle: 'Starting at ₹2,999',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMQ8f7buYJb5bLWAcq7YlgGPECBACSssw-_Hcosf8fA_rOPSs27XhRJE9Ub4XUDQrvx7KyndlG2pJC_Cb0aXrlQKYQf1unFMrE7CFg9cnoX9Ej9BtCQwQJ7t3JUUb61xMcjVVSfvEcQmidDQS0ThLGGtmbSC8L3ANcSiJMhJqeZKF2Hb4CUpvmHXGR3rXcZfWGDIZzpjjrnuyHvhcrFFFLHSVEb1OmlLjPd0MAxWCBf8DWsQGmhB9VghnDqs0o75_H0PyC-RxxjRW',
        link: '/categories/wedding',
        position: 'home',
        isActive: true,
        sortOrder: 4,
      },
    }),
  ])

  console.log(`Created ${banners.length} banners`)

  // Create Categories
  const weddingCat = await prisma.category.upsert({
    where: { slug: 'wedding' },
    update: {},
    create: {
      name: 'Wedding',
      slug: 'wedding',
      description: 'Wedding collection',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhSZ9XUQvYK0mUCkO9esdQmZfEXVMVuFYpYTAiRzYNnAEOZKrarND3t5vBWxsZAGjJD1WdH1g7qCMlJbVj3_3TfuZofxWqsyR8dTk5bWF3XnjMR_vYMVxf5qn-5fu8Q8Pi5Q6H2yYeKmQHPkvK4c2dXCU1xjKrbM2oP4XU06_p6tEJ92z_4TzWWaIlZ1gjL6gCkonAyNUuUz4z7RNNIOE9GZhax9jUg76ZrquNDvMVNXI-PZPkPPLh5xrOd6PfvTBrzu0SrTrb6r1o',
      isActive: true,
      sortOrder: 1,
    },
  })

  const partyCat = await prisma.category.upsert({
    where: { slug: 'party' },
    update: {},
    create: {
      name: 'Party',
      slug: 'party',
      description: 'Party wear collection',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj8DdxsG1ihKYMvMNAds0_JQuQxs3bM1T2YS7kQ9c77JIlkHpuqT7raP19bQD3lrE5wHqtAX345X_WA9xnoeza9ODcAUhC_ijGDjOCOyNLrW6bu7w7M0lzdlYFZwQ2pctXBF0UzFgFGzMght3fvCCOqozcrMXrJUQv5h6G9dUIZ_4nXbuMR31hz4jWI3sR_hJqIjndd_rnSVe2TvP1HeyutRRkjwtOvP_-eKofY53QACBe0AE3ORkOgp_A1eiRFqJI3zJ0WZCSkLHr',
      isActive: true,
      sortOrder: 2,
    },
  })

  const formalCat = await prisma.category.upsert({
    where: { slug: 'formal' },
    update: {},
    create: {
      name: 'Formal',
      slug: 'formal',
      description: 'Formal wear collection',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyOLK-48dT1qE3G1is_ymRuOKYXgBBgEbvP2mq2WFa015fy5bg3E2bQqn8vvy0Lgo0TRY9zmVx3PykkOR3QG2fkUtH8oqt-RwbU_YnntlOd7R_LFRPDDzaeRJF1pHFCUbksPf7PO0JACBD3_TLRaViY0lYpTaZG_qBwuPvuQp8-L4jZWWy-SFF1j1cLurtF8ychBvngWtW22Kr2AYjq9FuA-LNzxNOTfUnWafh8MjtSk8ugP7RYh97k7FGJS8etLQlabGEJiL5VcYM',
      isActive: true,
      sortOrder: 3,
    },
  })

  const casualCat = await prisma.category.upsert({
    where: { slug: 'casual' },
    update: {},
    create: {
      name: 'Casual',
      slug: 'casual',
      description: 'Casual wear collection',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlGSoeAxElB4gBZAReOa5shNbfPbQskdMZyyEZsF6TS6w5CPH5eTxjMO8M82D4cxjZT1hm8aHvyKvDb4zmiyxg6fOvQu4kTAXG3I6jgYD6YSoRhl-WD0Bh-ubdbXpzhdMvIC95zqzS7Hz3CKurDjKAzKUJFXYnOSazV_AggDClIThEANZLDD8FJsU-yDKOtko4V4C_viNkNC6AYrGd0zUxfWo2FjJwJRnuBfF5Y2amkjwn01VuKTqDVoHZF5M2QayQsmjl6yh5w_73',
      isActive: true,
      sortOrder: 4,
    },
  })

  console.log('Created categories')

  // Create a demo user first (needed for vendor)
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@rentsquare.com' },
    update: {},
    create: {
      email: 'demo@rentsquare.com',
      name: 'Demo Vendor',
      password: '$2a$10$rQZQZQZQZQZQZQZQZQZQZ.O9Y1Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z', // dummy hash
      role: 'VENDOR',
      isActive: true,
    },
  })

  // Create a demo vendor
  const demoVendor = await prisma.vendor.upsert({
    where: { businessSlug: 'demo-vendor' },
    update: {},
    create: {
      userId: demoUser.id,
      businessName: 'Demo Vendor',
      businessSlug: 'demo-vendor',
      description: 'Demo vendor for testing',
      status: 'APPROVED',
      isVerified: true,
    },
  })

  console.log('Created demo vendor:', demoVendor.id)

  // Get brand IDs for products
  const sabyasachiBrand = await prisma.brand.findUnique({ where: { slug: 'sabyasachi' }})
  const manishMalhotraBrand = await prisma.brand.findUnique({ where: { slug: 'manish-malhotra' }})
  const anitaDongreBrand = await prisma.brand.findUnique({ where: { slug: 'anita-dongre' }})
  const rituKumarBrand = await prisma.brand.findUnique({ where: { slug: 'ritu-kumar' }})
  const manyavarBrand = await prisma.brand.findUnique({ where: { slug: 'manyavar' }})
  const tarunTahilianiBrand = await prisma.brand.findUnique({ where: { slug: 'tarun-tahiliani' }})
  const raghavendraRathoreBrand = await prisma.brand.findUnique({ where: { slug: 'raghavendra-rathore' }})
  const anushreeReddyBrand = await prisma.brand.findUnique({ where: { slug: 'anushree-reddy' }})

  // Create Products with images from mock data
  const products = [
    {
      name: 'Velvet Zardosi Lehenga',
      slug: 'velvet-zardosi-lehenga',
      description: 'Beautiful velvet lehenga with zardosi work',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuACLA4f7buYJb5bLWAcq7YlgGPECBACSssw-_Hcosf8fA_rOPSs27XhRJE9Ub4XUDQrvx7KyndlG2pJC_Cb0aXrlQKYQf1unFMrE7CFg9cnoX9Ej9BtCQwQJ7t3JUUb61xMcjVVSfvEcQmidDQS0ThLGGtmbSC8L3ANcSiJMhJqeZKF2Hb4CUpvmHXGR3rXcZfWGDIZzpjjrnuyHvhcrFFFLHSVEb1OmlLjPd0MAxWCBf8DWsQGmhB9VghnDqs0o75_H0PyC-RxxjRW', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhSZ9XUQvYK0mUCkO9esdQmZfEXVMVuFYpYTAiRzYNnAEOZKrarND3t5vBWxsZAGjJD1WdH1g7qCMlJbVj3_3TfuZofxWqsyR8dTk5bWF3XnjMR_vYMVxf5qn-5fu8Q8Pi5Q6H2yYeKmQHPkvK4c2dXCU1xjKrbM2oP4XU06_p6tEJ92z_4TzWWaIlZ1gjL6gCkonAyNUuUz4z7RNNIOE9GZhax9jUg76ZrquNDvMVNXI-PZPkPPLh5xrOd6PfvTBrzu0SrTrb6r1o'],
      dailyPrice: 12499,
      categoryId: weddingCat.id,
      brandId: sabyasachiBrand?.id,
      isFeatured: true,
    },
    {
      name: 'Midnight Blue Sherwani',
      slug: 'midnight-blue-sherwani',
      description: 'Elegant midnight blue sherwani',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuB2d1pBBTI5Ca4FrpOQ4FVuJvYXerTVWroRubJ6Bocm66QtVD3IrS1VMglKiJHnZUHbfL2vR7RTQxYi_Mdt6okIDc4Dq4KHiR7qeLWNV-ctXeNSAe2vwDsf6MxiMUhuuXqKHcaU2rAD5xhTlp_KGL5dCBT3ASbyBU2Gh2xQXVhu6XpYj5mlrxoJc-nzLs9oWXClELvb6yR_ZDzqv7zSyjNPeCGaIGKPtg5NLVxDd5bxkN_KvLgSiBjavrPFhKXgR13SLBWLrZDRAp0x', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlGSoeAxElB4gBZAReOa5shNbfPbQskdMZyyEZsF6TS6w5CPH5eTxjMO8M82D4cxjZT1hm8aHvyKvDb4zmiyxg6fOvQu4kTAXG3I6jgYD6YSoRhl-WD0Bh-ubdbXpzhdMvIC95zqzS7Hz3CKurDjKAzKUJFXYnOSazV_AggDClIThEANZLDD8FJsU-yDKOtko4V4C_viNkNC6AYrGd0zUxfWo2FjJwJRnuBfF5Y2amkjwn01VuKTqDVoHZF5M2QayQsmjl6yh5w_73'],
      dailyPrice: 8999,
      categoryId: weddingCat.id,
      brandId: manishMalhotraBrand?.id,
      isFeatured: true,
    },
    {
      name: 'Floral Organza Gown',
      slug: 'floral-organza-gown',
      description: 'Stunning floral organza gown',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCSEzZ9rHpzU8ngSriArgwqy4ClXoKkIU4x6zeUw5xdzTzxBa-bGMle4av0EKPsUUZv8Wb4hb8W_NMYFLu8A7Z3Ajq-CDcsJlMNB7beZecy1M0gDP7xrzF1DlE56hMxlJ8GiQ7sXdDzdLFJMnGI4iCH2Sxp0Mub6veGJXTEZtaCQhZbjw4mFTgecY3jNAtKEw8VN-SO3E53CeP5VaUgspv6R-OLnjZZbonWj2uHg22dM157YuWkjt9pBSR05Xo74gx-7En8-xRT1951', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj8DdxsG1ihKYMvMNAds0_JQuQxs3bM1T2YS7kQ9c77JIlkHpuqT7raP19bQD3lrE5wHqtAX345X_WA9xnoeza9ODcAUhC_ijGDjOCOyNLrW6bu7w7M0lzdlYFZwQ2pctXBF0UzFgFGzMght3fvCCOqozcrMXrJUQv5h6G9dUIZ_4nXbuMR31hz4jWI3sR_hJqIjndd_rnSVe2TvP1HeyutRRkjwtOvP_-eKofY53QACBe0AE3ORkOgp_A1eiRFqJI3zJ0WZCSkLHr'],
      dailyPrice: 6500,
      categoryId: partyCat.id,
      brandId: anushreeReddyBrand?.id,
      isFeatured: true,
    },
    {
      name: 'Hand-Embroidery Silk Saree',
      slug: 'hand-embroidery-silk-saree',
      description: 'Beautiful silk saree with hand embroidery',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAHjfJj_iXLpPRIwZzWf6eO0ggFjYd1D98m-qyVUE50CRAHpWajBDJlfUZIPQCDWsjgTwXfODyYkaJ82_TMP6ytUXgVTSQ9dSKtOz9PzLzrSeSVCBMFtqU1HBNCsD_NwkeIvbJ-eKXYtyhMQ6m7dPe9OqntvTUtcX7iwI45weT4JsYjfpro9p3P5Gw2TasfgME1DzCJBFxJfDYRpjXfr4yYhC7RsYCaKSPrYSYhMbaLRyBoGav6L--IJ7Idg4gI1OVsfLsxSSyN8eXD', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyOLK-48dT1qE3G1is_ymRuOKYXgBBgEbvP2mq2WFa015fy5bg3E2bQqn8vvy0Lgo0TRY9zmVx3PykkOR3QG2fkUtH8oqt-RwbU_YnntlOd7R_LFRPDDzaeRJF1pHFCUbksPf7PO0JACBD3_TLRaViY0lYpTaZG_qBwuPvuQp8-L4jZWWy-SFF1j1cLurtF8ychBvngWtW22Kr2AYjq9FuA-LNzxNOTfUnWafh8MjtSk8ugP7RYh97k7FGJS8etLQlabGEJiL5VcYM'],
      dailyPrice: 4999,
      categoryId: formalCat.id,
      brandId: anitaDongreBrand?.id,
      isFeatured: true,
    },
    {
      name: 'Emerald Green Anarkali',
      slug: 'emerald-green-anarkali',
      description: 'Stunning emerald green Anarkali suit',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDj8DdxsG1ihKYMvMNAds0_JQuQxs3bM1T2YS7kQ9c77JIlkHpuqT7raP19bQD3lrE5wHqtAX345X_WA9xnoeza9ODcAUhC_ijGDjOCOyNLrW6bu7w7M0lzdlYFZwQ2pctXBF0UzFgFGzMght3fvCCOqozcrMXrJUQv5h6G9dUIZ_4nXbuMR31hz4jWI3sR_hJqIjndd_rnSVe2TvP1HeyutRRkjwtOvP_-eKofY53QACBe0AE3ORkOgp_A1eiRFqJI3zJ0WZCSkLHr', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2d1pBBTI5Ca4FrpOQ4FVuJvYXerTVWroRubJ6Bocm66QtVD3IrS1VMglKiJHnZUHbfL2vR7RTQxYi_Mdt6okIDc4Dq4KHiR7qeLWNV-ctXeNSAe2vwDsf6MxiMUhuuXqKHcaU2rAD5xhTlp_KGL5dCBT3ASbyBU2Gh2xQXVhu6XpYj5mlrxoJc-nzLs9oWXClELvb6yR_ZDzqv7zSyjNPeCGaIGKPtg5NLVxDd5bxkN_KvLgSiBjavrPFhKXgR13SLBWLrZDRAp0x'],
      dailyPrice: 7500,
      categoryId: partyCat.id,
      brandId: rituKumarBrand?.id,
      isFeatured: true,
    },
    {
      name: 'Royal Blue Bandhgala',
      slug: 'royal-blue-bandhgala',
      description: 'Classic royal blue bandhgala suit',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDlGSoeAxElB4gBZAReOa5shNbfPbQskdMZyyEZsF6TS6w5CPH5eTxjMO8M82D4cxjZT1hm8aHvyKvDb4zmiyxg6fOvQu4kTAXG3I6jgYD6YSoRhl-WD0Bh-ubdbXpzhdMvIC95zqzS7Hz3CKurDjKAzKUJFXYnOSazV_AggDClIThEANZLDD8FJsU-yDKOtko4V4C_viNkNC6AYrGd0zUxfWo2FjJwJRnuBfF5Y2amkjwn01VuKTqDVoHZF5M2QayQsmjl6yh5w_73', 'https://lh3.googleusercontent.com/aida-public/AB6AXuACLA4f7buYJb5bLWAcq7YlgGPECBACSssw-_Hcosf8fA_rOPSs27XhRJE9Ub4XUDQrvx7KyndlG2pJC_Cb0aXrlQKYQf1unFMrE7CFg9cnoX9Ej9BtCQwQJ7t3JUUb61xMcjVVSfvEcQmidDQS0ThLGGtmbSC8L3ANcSiJMhJqeZKF2Hb4CUpvmHXGR3rXcZfWGDIZzpjjrnuyHvhcrFFFLHSVEb1OmlLjPd0MAxWCBf8DWsQGmhB9VghnDqs0o75_H0PyC-RxxjRW'],
      dailyPrice: 11000,
      categoryId: formalCat.id,
      brandId: raghavendraRathoreBrand?.id,
      isFeatured: true,
    },
    {
      name: 'Blush Pink Lehenga',
      slug: 'blush-pink-lehenga',
      description: 'Beautiful blush pink lehenga',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCyOLK-48dT1qE3G1is_ymRuOKYXgBBgEbvP2mq2WFa015fy5bg3E2bQqn8vvy0Lgo0TRY9zmVx3PykkOR3QG2fkUtH8oqt-RwbU_YnntlOd7R_LFRPDDzaeRJF1pHFCUbksPf7PO0JACBD3_TLRaViY0lYpTaZG_qBwuPvuQp8-L4jZWWy-SFF1j1cLurtF8ychBvngWtW22Kr2AYjq9FuA-LNzxNOTfUnWafh8MjtSk8ugP7RYh97k7FGJS8etLQlabGEJiL5VcYM', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSEzZ9rHpzU8ngSriArgwqy4ClXoKkIU4x6zeUw5xdzTzxBa-bGMle4av0EKPsUUZv8Wb4hb8W_NMYFLu8A7Z3Ajq-CDcsJlMNB7beZecy1M0gDP7xrzF1DlE56hMxlJ8GiQ7sXdDzdLFJMnGI4iCH2Sxp0Mub6veGJXTEZtaCQhZbjw4mFTgecY3jNAtKEw8VN-SO3E53CeP5VaUgspv6R-OLnjZZbonWj2uHg22dM157YuWkjt9pBSR05Xo74gx-7En8-xRT1951'],
      dailyPrice: 15500,
      categoryId: weddingCat.id,
      brandId: tarunTahilianiBrand?.id,
      isFeatured: true,
    },
    {
      name: 'Ivory Silk Kurta Set',
      slug: 'ivory-silk-kurta-set',
      description: 'Elegant ivory silk kurta set',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBhSZ9XUQvYK0mUCkO9esdQmZfEXVMVuFYpYTAiRzYNnAEOZKrarND3t5vBWxsZAGjJD1WdH1g7qCMlJbVj3_3TfuZofxWqsyR8dTk5bWF3XnjMR_vYMVxf5qn-5fu8Q8Pi5Q6H2yYeKmQHPkvK4c2dXCU1xjKrbM2oP4XU06_p6tEJ92z_4TzWWaIlZ1gjL6gCkonAyNUuUz4z7RNNIOE9GZhax9jUg76ZrquNDvMVNXI-PZPkPPLh5xrOd6PfvTBrzu0SrTrb6r1o', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHjfJj_iXLpPRIwZzWf6eO0ggFjYd1D98m-qyVUE50CRAHpWajBDJlfUZIPQCDWsjgTwXfODyYkaJ82_TMP6ytUXgVTSQ9dSKtOz9PzLzrSeSVCBMFtU1HBNCsD_NwkeIvbJ-eKXYtyhMQ6m7dPe9OqntvTUtcX7iwI45weT4JsYjfpro9p3P5Gw2TasfgME1DzCJBFxJfDYRpjXfr4yYhC7RsYCaKSPrYSYhMbaLRyBoGav6L--IJ7Idg4gI1OVsfLsxSSyN8eXD'],
      dailyPrice: 5500,
      categoryId: casualCat.id,
      brandId: manyavarBrand?.id,
      isFeatured: true,
    },
  ]

  // Create products
  for (const productData of products) {
    await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: {
        name: productData.name,
        slug: productData.slug,
        description: productData.description,
        images: productData.images,
        dailyPrice: productData.dailyPrice,
        categoryId: productData.categoryId,
        brandId: productData.brandId,
        isFeatured: productData.isFeatured,
        status: 'ACTIVE',
        vendorId: demoVendor.id,
      },
    })
  }

  console.log(`Created ${products.length} products`)

  console.log('Seed completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
