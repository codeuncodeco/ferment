/**
 * Fermenti Demo - Settings Page
 * Mock app settings showing form components, toggles, modals, and changelog
 */

export default {
  name: 'settings-page',

  data() {
    return {
      activeTab: 'profile',
      showModal: false,
      profile: {
        name: 'Amit Kumar',
        email: 'amit@example.com',
        bio: 'Full-stack developer who loves building beautiful PWAs.',
      },
      preferences: {
        darkMode: false,
        notifications: true,
        newsletter: false,
        language: 'en',
        compactView: false,
        autoSave: true,
      },
      notifications: {
        email: true,
        push: false,
        sms: false,
        weekly: true,
        marketing: false,
      },
      security: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      changelogEntries: [
        {
          version: '2.1.0',
          date: '2026-03-12',
          title: 'Dashboard Redesign',
          summary: 'Complete dashboard overhaul with new analytics widgets.',
          items: [
            { type: 'feature', text: 'New analytics dashboard with real-time charts' },
            { type: 'feature', text: 'Customizable widget grid layout' },
            { type: 'enhancement', text: 'Improved data export with CSV and PDF support' },
            { type: 'fix', text: 'Fixed timezone handling in date filters' },
          ],
        },
        {
          version: '2.0.0',
          date: '2026-03-01',
          title: 'Major Platform Update',
          summary: 'New design system, improved performance, and API v2.',
          items: [
            { type: 'feature', text: 'Fermenti design system integration' },
            { type: 'feature', text: 'API v2 with GraphQL support' },
            { type: 'enhancement', text: '60% faster page load times' },
            { type: 'fix', text: 'Memory leak in notification service resolved' },
          ],
        },
      ],
      tabs: [
        { id: 'profile', label: 'Profile' },
        { id: 'preferences', label: 'Preferences' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'security', label: 'Security' },
      ],
      languageOptions: [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
        { value: 'fr', label: 'French' },
        { value: 'de', label: 'German' },
        { value: 'ja', label: 'Japanese' },
        { value: 'hi', label: 'Hindi' },
      ],
    };
  },

  template: `
    <div class="max-w-3xl mx-auto">
      <h1 class="font-serif text-3xl text-text-primary dark:text-dark-text mb-2">Settings</h1>
      <p class="text-text-muted mb-6">Manage your account preferences and security.</p>

      <!-- Tabs -->
      <fi-tabs :tabs="tabs" v-model="activeTab" variant="segment" class="mb-8"></fi-tabs>

      <!-- Profile Tab -->
      <div v-if="activeTab === 'profile'" class="space-y-6">
        <div class="bg-bg-card dark:bg-dark-card rounded-2xl p-6 border border-bg-secondary dark:border-dark-secondary">
          <h2 class="font-serif text-xl text-text-primary dark:text-dark-text mb-4">Profile Information</h2>

          <div class="flex items-center gap-4 mb-6">
            <fi-avatar initials="AK" size="lg" variant="brine"></fi-avatar>
            <div>
              <p class="font-medium text-text-primary dark:text-dark-text">{{ profile.name }}</p>
              <p class="text-sm text-text-muted">{{ profile.email }}</p>
            </div>
          </div>

          <div class="space-y-4">
            <fi-input v-model="profile.name" label="Full Name" placeholder="Your name"></fi-input>
            <fi-input v-model="profile.email" label="Email" type="email" placeholder="your@email.com"></fi-input>
            <fi-textarea v-model="profile.bio" label="Bio" placeholder="Tell us about yourself..." :maxLength="200"></fi-textarea>
          </div>

          <div class="flex justify-end mt-6">
            <fi-button variant="primary">Save Profile</fi-button>
          </div>
        </div>
      </div>

      <!-- Preferences Tab -->
      <div v-if="activeTab === 'preferences'" class="space-y-6">
        <div class="bg-bg-card dark:bg-dark-card rounded-2xl p-6 border border-bg-secondary dark:border-dark-secondary space-y-5">
          <h2 class="font-serif text-xl text-text-primary dark:text-dark-text mb-4">Appearance & Behavior</h2>

          <fi-toggle v-model="preferences.darkMode" label="Dark Mode" description="Switch between light and dark themes"></fi-toggle>
          <hr class="border-bg-secondary dark:border-dark-secondary">
          <fi-toggle v-model="preferences.notifications" label="Enable Notifications" description="Receive in-app notifications"></fi-toggle>
          <hr class="border-bg-secondary dark:border-dark-secondary">
          <fi-toggle v-model="preferences.newsletter" label="Newsletter" description="Receive weekly newsletter emails"></fi-toggle>
          <hr class="border-bg-secondary dark:border-dark-secondary">
          <fi-toggle v-model="preferences.compactView" label="Compact View" description="Use smaller spacing and fonts"></fi-toggle>
          <hr class="border-bg-secondary dark:border-dark-secondary">
          <fi-toggle v-model="preferences.autoSave" label="Auto Save" description="Automatically save changes as you type"></fi-toggle>
          <hr class="border-bg-secondary dark:border-dark-secondary">
          <fi-select v-model="preferences.language" label="Language" :options="languageOptions"></fi-select>
        </div>
      </div>

      <!-- Notifications Tab -->
      <div v-if="activeTab === 'notifications'" class="space-y-6">
        <div class="bg-bg-card dark:bg-dark-card rounded-2xl p-6 border border-bg-secondary dark:border-dark-secondary space-y-5">
          <h2 class="font-serif text-xl text-text-primary dark:text-dark-text mb-4">Notification Channels</h2>

          <fi-toggle v-model="notifications.email" label="Email Notifications" description="Receive notifications via email"></fi-toggle>
          <hr class="border-bg-secondary dark:border-dark-secondary">
          <fi-toggle v-model="notifications.push" label="Push Notifications" description="Browser push notifications"></fi-toggle>
          <hr class="border-bg-secondary dark:border-dark-secondary">
          <fi-toggle v-model="notifications.sms" label="SMS Notifications" description="Text message alerts for critical events"></fi-toggle>
          <hr class="border-bg-secondary dark:border-dark-secondary">
          <fi-toggle v-model="notifications.weekly" label="Weekly Digest" description="Summary of activity sent every Monday"></fi-toggle>
          <hr class="border-bg-secondary dark:border-dark-secondary">
          <fi-toggle v-model="notifications.marketing" label="Marketing Updates" description="Product announcements and offers"></fi-toggle>
        </div>
      </div>

      <!-- Security Tab -->
      <div v-if="activeTab === 'security'" class="space-y-6">
        <div class="bg-bg-card dark:bg-dark-card rounded-2xl p-6 border border-bg-secondary dark:border-dark-secondary">
          <h2 class="font-serif text-xl text-text-primary dark:text-dark-text mb-4">Change Password</h2>
          <div class="space-y-4">
            <fi-input v-model="security.currentPassword" label="Current Password" type="password" placeholder="Enter current password"></fi-input>
            <fi-input v-model="security.newPassword" label="New Password" type="password" placeholder="Enter new password"></fi-input>
            <fi-input v-model="security.confirmPassword" label="Confirm Password" type="password" placeholder="Confirm new password"
              :error="security.confirmPassword && security.newPassword !== security.confirmPassword ? 'Passwords do not match' : ''"></fi-input>
          </div>
          <div class="flex justify-between items-center mt-6">
            <fi-button variant="ghost" @click="showModal = true">Setup 2FA</fi-button>
            <fi-button variant="primary">Update Password</fi-button>
          </div>
        </div>

        <!-- 2FA Modal -->
        <fi-modal v-model="showModal" title="Two-Factor Authentication" size="sm">
          <div class="text-center space-y-4">
            <div class="w-16 h-16 bg-accent-culture/10 rounded-full flex items-center justify-center mx-auto">
              <svg class="w-8 h-8 text-accent-culture" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h3 class="font-medium text-text-primary dark:text-dark-text">Enable Two-Factor Authentication</h3>
            <p class="text-sm text-text-muted">Add an extra layer of security to your account by requiring a verification code in addition to your password.</p>
            <fi-button variant="primary" @click="showModal = false" class="w-full">Get Started</fi-button>
          </div>
        </fi-modal>
      </div>

      <!-- Changelog -->
      <div class="mt-10">
        <fi-collapsible title="What's New" :expanded="false">
          <fi-changelog :entries="changelogEntries" class="mt-2"></fi-changelog>
        </fi-collapsible>
      </div>
    </div>
  `,
};
