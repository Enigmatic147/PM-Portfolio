import React, { useState } from 'react';
import { contactData, personalInfo } from '../mock';
import { submitContactForm } from '../services/api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        toast({
          title: "Message sent!",
          description: result.message || "Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">
            Contact
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl">
            {contactData.title}
          </p>
          <p className="text-base text-neutral-500 mt-2 max-w-3xl">
            {contactData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div>
            <div className="border border-neutral-200 bg-white p-8">
              <div className="space-y-6">
                {contactData.details.map((detail, index) => (
                  <div key={index}>
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">
                      {detail.label}
                    </p>
                    <p className="text-base text-black font-medium">
                      {detail.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="border border-neutral-200 bg-white p-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-semibold text-black mb-2">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="border-neutral-300 focus:border-black"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-semibold text-black mb-2">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="border-neutral-300 focus:border-black"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-sm font-semibold text-black mb-2">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="border-neutral-300 focus:border-black"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm font-semibold text-black mb-2">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="border-neutral-300 focus:border-black resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white hover:bg-neutral-800 transition-colors font-medium"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;