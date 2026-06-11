import { useState } from 'react';
import Layout from '@/components/layout/Layout';

const faqCategories = [
  {
    category: 'Booking & Reservations',
    questions: [
      {
        question: 'How do I make a reservation?',
        answer: 'You can make a reservation through our website by selecting your pickup location, dates, and vehicle of choice. Complete the checkout process to confirm your booking. You can also call us at (202) 555-0123.',
      },
      {
        question: 'Can I modify or cancel my reservation?',
        answer: 'Yes, you can modify or cancel your reservation through your account dashboard or by contacting us. Free cancellation is available up to 48 hours before pickup. Cancellations within 48 hours may incur a fee.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover) and debit cards with a Visa or MasterCard logo. Payment is processed securely through Stripe.',
      },
    ],
  },
  {
    category: 'Rental Requirements',
    questions: [
      {
        question: 'What documents do I need to rent a car?',
        answer: 'You need a valid driver\'s license, a major credit card in your name, and proof of insurance (or you can purchase our coverage). International visitors need a valid passport and an international driving permit if the license is not in English.',
      },
      {
        question: 'What is the minimum age to rent?',
        answer: 'The minimum age is 21 years old. Drivers under 25 may be subject to a young driver surcharge. Some luxury and specialty vehicles require renters to be 25 or older.',
      },
      {
        question: 'Can I add an additional driver?',
        answer: 'Yes, additional drivers are welcome. All drivers must present valid identification and meet the same requirements as the primary renter. Additional driver fees may apply.',
      },
    ],
  },
  {
    category: 'Vehicle & Insurance',
    questions: [
      {
        question: 'What insurance options are available?',
        answer: 'We offer several coverage options including Collision Damage Waiver (CDW), Supplemental Liability Insurance (SLI), and Personal Accident Insurance (PAI). Our team can explain all options at pickup.',
      },
      {
        question: 'What happens if the vehicle breaks down?',
        answer: 'All our vehicles include 24/7 roadside assistance. Simply call our emergency number and we\'ll send help. We\'ll either repair the vehicle or provide a replacement.',
      },
      {
        question: 'Is smoking allowed in the vehicles?',
        answer: 'No, all our vehicles are non-smoking. A cleaning fee of up to $250 will be charged for vehicles returned with smoke odors or residue.',
      },
    ],
  },
  {
    category: 'Policies & Fees',
    questions: [
      {
        question: 'What is your fuel policy?',
        answer: 'Vehicles are provided with a full tank of fuel. You can return the vehicle with a full tank, or we can charge you for the fuel used at competitive market rates plus a small service fee.',
      },
      {
        question: 'Are there mileage limits?',
        answer: 'Standard daily rentals include unlimited mileage within the DMV area. For extended rentals, specific mileage allowances apply. Check your rental agreement for details.',
      },
      {
        question: 'What late fees apply?',
        answer: 'Late returns are charged at an hourly rate for up to 4 hours. After 4 hours, a full additional day may be charged. Please contact us if you need to extend your rental.',
      },
    ],
  },
];

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="font-medium text-navy pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-gold flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-4 animate-fade-in">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-white/70 max-w-2xl">
            Find answers to common questions about our rental services, policies, and procedures.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqCategories.map((category, index) => (
            <div key={index} className="mb-12">
              <h2 className="font-serif text-2xl text-navy mb-6">{category.category}</h2>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6">
                  {category.questions.map((item, qIndex) => (
                    <AccordionItem
                      key={qIndex}
                      question={item.question}
                      answer={item.answer}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Contact CTA */}
          <div className="bg-gold/10 rounded-xl p-8 text-center">
            <h3 className="font-serif text-2xl text-navy mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              Our team is here to help. Contact us directly for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+12025550123"
                className="inline-flex items-center justify-center px-6 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (202) 555-0123
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-gold text-gold font-semibold rounded-lg hover:bg-gold/10 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
