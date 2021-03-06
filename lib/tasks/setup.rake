desc 'drops the db, creates db, migrates db and populates sample data'
task setup: [:environment, 'db:drop', 'db:create', 'db:migrate'] do
  Rake::Task['populate_with_sample_data'].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    create_sample_data!
    puts "sample data for user and category has been added."
  end
end

def create_sample_data!
  puts 'Seeding with sample data...'
  User.create(email: 'oliver@example.com', name: 'Oliver Smith')
  Site.create(name: 'Spinkart', password: nil)
  category = Category.create(value: 'Getting Started')
  Article.create(heading: "Welcome to Scribble", content: "This is the first page of SpinKart", category: category)
end
