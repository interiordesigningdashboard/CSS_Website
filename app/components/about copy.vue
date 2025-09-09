<template>
  <section id="about" class="section about">
    <div class="container">
      <!-- Main About Content -->
      <div class="about-content">
        <!-- About Text -->
        <div class="about-text">
          <h2 class="about-title">About ColorCraft</h2>
          <p class="about-description">
            With over a decade of experience in the signage and printing industry, ColorCraft has 
            established itself as a leader in innovative visual solutions. We combine cutting-edge 
            technology with artistic creativity to deliver exceptional results that exceed our 
            clients' expectations.
          </p>
          
          <p class="about-description">
            Our team of skilled designers, fabricators, and project managers work collaboratively 
            to ensure every project is completed with precision, on time, and within budget. We 
            pride ourselves on our attention to detail and commitment to quality.
          </p>

          <!-- Company Features -->
          <div class="about-features">
            <div 
              v-for="(feature, index) in features" 
              :key="feature.text"
              class="feature"
              :class="{ 'visible': visibleFeatures.includes(index) }"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="feature-icon">
                <i :class="feature.icon"></i>
              </div>
              <span>{{ feature.text }}</span>
            </div>
          </div>

          <!-- Call to Action -->
          <div class="about-cta">
            <a href="#contact" class="about-button" @click="scrollToContact">
              <span>Work With Us</span>
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>

        <!-- About Visual -->
        <div class="about-visual">
          <!-- Company Stats -->
          <div class="stats-grid">
            <div 
              v-for="(stat, index) in stats" 
              :key="stat.label"
              class="stat-item"
              :class="{ 'visible': visibleStats.includes(index) }"
              :style="{ animationDelay: `${index * 0.2}s` }"
            >
              <div class="stat-number">
                <span ref="statNumbers">{{ displayedStats[index] || 0 }}</span>
                <span class="stat-suffix">{{ stat.suffix }}</span>
              </div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>

          <!-- Company Image/Illustration -->
          <div class="about-image">
            <div class="image-background">
              <div class="floating-elements">
                <div 
                  v-for="(element, index) in floatingElements" 
                  :key="index"
                  class="floating-element"
                  :style="element.style"
                >
                  <i :class="element.icon"></i>
                </div>
              </div>
              <div class="main-icon">
                <i class="fas fa-building"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <!-- <div class="team-section">
        <h3 class="team-title">Our Leadership Team</h3>
        <div class="team-grid">
          <div 
            v-for="(member, index) in teamMembers" 
            :key="member.name"
            class="team-member"
            :class="{ 'visible': visibleTeam.includes(index) }"
            :style="{ animationDelay: `${index * 0.15}s` }"
          >
            <div class="member-photo">
              <div class="photo-placeholder" :style="{ background: member.gradient }">
                <i :class="member.icon"></i>
              </div>
            </div>
            <div class="member-info">
              <h4>{{ member.name }}</h4>
              <p class="member-role">{{ member.role }}</p>
              <p class="member-description">{{ member.description }}</p>
              <div class="member-social">
                <a 
                  v-for="social in member.social" 
                  :key="social.platform"
                  :href="social.url" 
                  class="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i :class="social.icon"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <!-- Values Section -->
      <!-- <div class="values-section">
        <h3 class="values-title">Our Core Values</h3>
        <div class="values-grid">
          <div 
            v-for="(value, index) in coreValues" 
            :key="value.title"
            class="value-card"
            :class="{ 'visible': visibleValues.includes(index) }"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="value-icon">
              <i :class="value.icon"></i>
            </div>
            <h4>{{ value.title }}</h4>
            <p>{{ value.description }}</p>
          </div>
        </div>
      </div> -->
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutSection',
  data() {
    return {
      visibleFeatures: [],
      visibleStats: [],
      visibleTeam: [],
      visibleValues: [],
      displayedStats: ["10K", 26, 98, 72],
      statsAnimated: false,
      
      features: [
        {
          icon: 'fas fa-check-circle',
          text: 'Premium Quality Materials'
        },
        {
          icon: 'fas fa-check-circle',
          text: 'Expert Craftsmanship'
        },
        {
          icon: 'fas fa-check-circle',
          text: 'Innovative Design Solutions'
        },
        {
          icon: 'fas fa-check-circle',
          text: 'Timely Project Delivery'
        }
      ],
      
      stats: [
        {
          number: 500,
          suffix: '+',
          label: 'Projects Completed'
        },
        {
          number: 12,
          suffix: '+',
          label: 'Years Experience'
        },
        {
          number: 98,
          suffix: '%',
          label: 'Client Satisfaction'
        },
        {
          number: 24,
          suffix: 'hr',
          label: 'Support Available'
        }
      ],
      
      floatingElements: [
        {
          icon: 'fas fa-lightbulb',
          style: {
            top: '15%',
            left: '20%',
            color: '#f59e0b',
            animation: 'float 6s ease-in-out infinite'
          }
        },
        {
          icon: 'fas fa-palette',
          style: {
            top: '60%',
            right: '25%',
            color: '#ec4899',
            animation: 'float 8s ease-in-out infinite reverse'
          }
        },
        {
          icon: 'fas fa-cogs',
          style: {
            bottom: '20%',
            left: '15%',
            color: '#10b981',
            animation: 'float 7s ease-in-out infinite'
          }
        }
      ],
      
      teamMembers: [
        {
          name: 'Sarah Johnson',
          role: 'Creative Director',
          description: 'Leading our design team with 15+ years of creative expertise in brand identity and visual communications.',
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          icon: 'fas fa-user-tie',
          social: [
            { platform: 'LinkedIn', icon: 'fab fa-linkedin-in', url: '#' },
            { platform: 'Instagram', icon: 'fab fa-instagram', url: '#' }
          ]
        },
        {
          name: 'Michael Chen',
          role: 'Production Manager',
          description: 'Ensuring quality and efficiency in all our fabrication processes with precision and attention to detail.',
          gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          icon: 'fas fa-user-cog',
          social: [
            { platform: 'LinkedIn', icon: 'fab fa-linkedin-in', url: '#' },
            { platform: 'Twitter', icon: 'fab fa-twitter', url: '#' }
          ]
        },
        {
          name: 'Emily Rodriguez',
          role: 'Client Relations',
          description: 'Building lasting relationships with our clients and ensuring every project exceeds expectations.',
          gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
          icon: 'fas fa-user-friends',
          social: [
            { platform: 'LinkedIn', icon: 'fab fa-linkedin-in', url: '#' },
            { platform: 'Facebook', icon: 'fab fa-facebook-f', url: '#' }
          ]
        }
      ],
      
      coreValues: [
        {
          icon: 'fas fa-star',
          title: 'Excellence',
          description: 'We strive for perfection in every project, delivering results that exceed expectations and set new standards in the industry.'
        },
        {
          icon: 'fas fa-lightbulb',
          title: 'Innovation',
          description: 'Constantly exploring new technologies and creative approaches to solve design challenges and push boundaries.'
        },
        {
          icon: 'fas fa-handshake',
          title: 'Integrity',
          description: 'Building trust through honest communication, transparent processes, and reliable delivery on our promises.'
        },
        {
          icon: 'fas fa-users',
          title: 'Collaboration',
          description: 'Working closely with clients as partners to understand their vision and bring it to life through teamwork.'
        }
      ]
    }
  },
  mounted() {
    this.setupIntersectionObserver()
  },
  methods: {
    setupIntersectionObserver() {
      const options = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target.dataset.section
            const index = parseInt(entry.target.dataset.index)
            
            switch (section) {
              case 'features':
                if (!this.visibleFeatures.includes(index)) {
                  this.visibleFeatures.push(index)
                }
                break
              case 'stats':
                if (!this.visibleStats.includes(index)) {
                  this.visibleStats.push(index)
                  if (!this.statsAnimated) {
                    this.animateStats()
                    this.statsAnimated = true
                  }
                }
                break
              case 'team':
                if (!this.visibleTeam.includes(index)) {
                  this.visibleTeam.push(index)
                }
                break
              case 'values':
                if (!this.visibleValues.includes(index)) {
                  this.visibleValues.push(index)
                }
                break
            }
          }
        })
      }, options)

      // Observe elements after next tick
      this.$nextTick(() => {
        // Observe features
        const features = document.querySelectorAll('.feature')
        features.forEach((feature, index) => {
          feature.dataset.section = 'features'
          feature.dataset.index = index
          observer.observe(feature)
        })

        // Observe stats
        const stats = document.querySelectorAll('.stat-item')
        stats.forEach((stat, index) => {
          stat.dataset.section = 'stats'
          stat.dataset.index = index
          observer.observe(stat)
        })

        // Observe team members
        const team = document.querySelectorAll('.team-member')
        team.forEach((member, index) => {
          member.dataset.section = 'team'
          member.dataset.index = index
          observer.observe(member)
        })

        // Observe values
        const values = document.querySelectorAll('.value-card')
        values.forEach((value, index) => {
          value.dataset.section = 'values'
          value.dataset.index = index
          observer.observe(value)
        })
      })
    },

    animateStats() {
      this.stats.forEach((stat, index) => {
        this.animateNumber(index, stat.number)
      })
    },

    animateNumber(index, targetNumber) {
      const duration = 2000 // 2 seconds
      const steps = 60
      const increment = targetNumber / steps
      let current = 0
      let step = 0

      const timer = setInterval(() => {
        step++
        current = Math.min(increment * step, targetNumber)
        this.$set(this.displayedStats, index, Math.floor(current))

        if (step >= steps) {
          clearInterval(timer)
          this.$set(this.displayedStats, index, targetNumber)
        }
      }, duration / steps)
    },

    scrollToContact() {
      const element = document.querySelector('#contact')
      if (element) {
        const offsetTop = element.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>

<style scoped>
/* About Section Styles */
.section {
  padding: 5rem 0;
}

.about {
  background: #f9fafb;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Main About Content */
.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 5rem;
}

.about-text {
  padding-right: 2rem;
}

.about-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1f2937;
  background: linear-gradient(135deg, #2563eb, #f97316);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-description {
  font-size: 1.1rem;
  color: #4b5563;
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

/* Company Features */
.about-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 2rem 0;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.6s ease;
}

.feature.visible {
  opacity: 1;
  transform: translateX(0);
}

.feature-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #10b981, #34d399);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
}

.feature span {
  font-weight: 600;
  color: #1f2937;
}

/* About CTA */
.about-cta {
  margin-top: 2rem;
}

.about-button {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3);
}

.about-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(37, 99, 235, 0.4);
}

.about-button i {
  transition: transform 0.3s ease;
}

.about-button:hover i {
  transform: translateX(3px);
}

/* About Visual */
.about-visual {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-item {
  background: white;
  padding: 2rem 1.5rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
  border: 1px solid transparent;
}

.stat-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border-color: rgba(37, 99, 235, 0.2);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #2563eb, #f97316);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.stat-suffix {
  font-size: 1.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* About Image */
.about-image {
  position: relative;
  height: 300px;
}

.image-background {
  background: linear-gradient(135deg, #eff6ff, #fdf2f8);
  border-radius: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.floating-element {
  position: absolute;
  font-size: 2rem;
  opacity: 0.6;
}

.main-icon {
  font-size: 6rem;
  color: #2563eb;
  opacity: 0.3;
  z-index: 2;
  position: relative;
}

/* Team Section */
.team-section {
  margin-bottom: 5rem;
}

.team-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #1f2937;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.team-member {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.team-member.visible {
  opacity: 1;
  transform: translateY(0);
}

.team-member:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}

.member-photo {
  margin-bottom: 1.5rem;
}

.photo-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: rgba(255, 255, 255, 0.8);
}

.member-info h4 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.member-role {
  font-size: 1rem;
  color: #2563eb;
  font-weight: 600;
  margin-bottom: 1rem;
}

.member-description {
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.member-social {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #2563eb;
  color: white;
  transform: translateY(-2px);
}

/* Values Section */
.values-section {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.values-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #1f2937;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.value-card {
  text-align: center;
  padding: 2rem 1rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.value-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.value-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #f97316, #ec4899);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  margin: 0 auto 1.5rem;
  transition: transform 0.3s ease;
}

.value-card:hover .value-icon {
  transform: scale(1.1) rotate(5deg);
}

.value-card h4 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
}

.value-card p {
  color: #6b7280;
  line-height: 1.6;
}

/* Animations */
@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg);
  }
  33% { 
    transform: translateY(-10px) rotate(2deg);
  }
  66% { 
    transform: translateY(-5px) rotate(-2deg);
  }
}

/* Responsive Design */
@media (max-width: 968px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .about-text {
    padding-right: 0;
  }
  
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
  
  .stat-item {
    padding: 1.5rem 1rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .section {
    padding: 3rem 0;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .about-title {
    font-size: 2rem;
  }
  
  .about-features {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .team-grid {
    grid-template-columns: 1fr;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
  }
  
  .values-section {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .about-features {
    gap: 0.75rem;
  }
  
  .feature {
    padding: 0.75rem;
    flex-direction: column;
    text-align: center;
  }
  
  .feature-icon {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
  }
  
  .stats-grid {
    gap: 1rem;
  }
  
  .stat-item {
    padding: 1.25rem 0.75rem;
  }
  
  .stat-number {
    font-size: 1.8rem;
  }
  
  .team-member {
    padding: 1.5rem;
  }
  
  .values-section {
    padding: 1.5rem;
  }
}
</style>