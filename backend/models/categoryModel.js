import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  icon: {
    type: String,
    default: 'default-icon.png'
  },
  subcategories: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      lowercase: true
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create slug from name
categorySchema.pre('save', function(next) {
  this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (this.subcategories && this.subcategories.length > 0) {
    this.subcategories.forEach(sub => {
      sub.slug = sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    });
  }
  next();
});

const Category = mongoose.model('Category', categorySchema);

export default Category; 