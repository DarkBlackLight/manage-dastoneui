module ManageHelper
  def manage_render_horizontal(routes)
    (routes.filter { |route| route[:can] }.map do |route|
      route[:children] ?
        (
          tag.li class: "has-submenu" do
            (
              tag.a 'href': '#' do
                (tag.span (tag.i "", class: "#{route[:icon]} align-self-center hori-menu-icon") + route[:name], class: '')
              end
            ) + (
              tag.ul class: "submenu" do
                manage_render_horizontal_children(route[:children])
              end
            )
          end
        )
        :
        (
          tag.li class: "has-submenu" do
            link_to route[:url] do
              (tag.span ((route[:icon] ? (tag.i "", class: "#{route[:icon]} align-self-center hori-menu-icon") : '') + route[:name]), class: '')
            end
          end
        )
    end).inject { |sum, n| sum + n }
  end

  def manage_render_horizontal_children(routes)
    (routes.filter { |route| route[:can] }.map do |route|
      route[:children] ?
        (
          tag.li class: "has-submenu" do
            (
              tag.a 'href': '#' do
                (tag.i "", class: "ti ti-minus") + route[:name]
              end
            ) + (
              tag.ul class: "submenu" do
                manage_render_horizontal_children(route[:children])
              end
            )
          end
        )
        :
        (
          tag.li class: "" do
            link_to route[:url] do
              (tag.i "", class: "ti ti-minus") + route[:name]
            end
          end
        )
    end).inject { |sum, n| sum + n }
  end

  def manage_text_field(form, field, options = {})
    options[:class] = "#{options[:class]} form-control"
    tag.div class: 'form-group' do
      (form.label field) + (form.text_field field, options)
    end
  end

  def manage_email_field(form, field, options = {})
    options[:class] = "#{options[:class]} form-control"
    tag.div class: 'form-group' do
      (form.label field) + (form.email_field field, options)
    end
  end

  def manage_file_field(form, field, options = {})
    options[:class] = "#{options[:class]} form-control"
    options[:style] = "border:none !important;"
    tag.div class: 'form-group' do
      (form.label field) + (form.file_field field, options)
    end
  end

  def manage_password_field(form, field, options = {})
    options[:class] = "#{options[:class]} form-control"
    tag.div class: 'form-group' do
      (form.label field) + (form.password_field field, options)
    end
  end

  def manage_date_field(form, field, options = {})
    options[:class] = "#{options[:class]} form-control datepicker"
    tag.div class: 'form-group' do
      (form.label field) + (form.text_field field, options)
    end
  end

  def manage_datetime_field(form, field, options = {})
    options[:class] = "#{options[:class]} form-control datetimepicker"
    tag.div class: 'form-group' do
      (form.label field) + (form.text_field field, options)
    end
  end

  def manage_time_field(form, field, options = {})
    options[:class] = "#{options[:class]} form-control"
    tag.div class: 'form-group' do
      (form.label field) + (form.time_field field, options)
    end
  end

  def manage_number_field(form, field, options = {})
    options[:class] = "#{options[:class]} form-control"
    tag.div class: 'form-group' do
      (form.label field) + (form.number_field field, options)
    end
  end

  def manage_text_area_field(form, field, options = {})
    options[:class] = "#{options[:class]} form-control"
    tag.div class: 'form-group' do
      (form.label field) + (form.text_area field, options)
    end
  end

  def manage_collection_select_field(form, field, collection, value_method, text_method, options = {}, html_options = {})
    html_options[:class] = "#{html_options[:class]} form-control select2"
    tag.div class: 'form-group' do
      (form.label field) + (form.collection_select field, collection, value_method, text_method, options, html_options)
    end
  end

  def manage_select_field(form, field, choices, options = {}, html_options = {})
    html_options[:class] = "#{html_options[:class]} form-control select2"
    tag.div class: 'form-group' do
      (form.label field) + (form.select field, choices, options, html_options)
    end
  end

  def manage_text_tag(label, name, value, options = {})
    options[:class] = "#{options[:class]} form-control"
    manage_tag = (text_field_tag name, value, options)
    tag.div class: 'form-group' do
      (label ? ((label_tag label) + manage_tag) : manage_tag)
    end
  end

  def manage_number_tag(label, name, value, options = {})
    options[:class] = "#{options[:class]} form-control"
    manage_tag = (number_field_tag name, value, options)
    tag.div class: 'form-group' do
      (label ? ((label_tag label) + manage_tag) : manage_tag)
    end
  end

  def manage_collection_select_tag(label, name, value, collection, value_method, text_method, options = {})
    options[:class] = "#{options[:class]} form-control select2 "
    manage_tag = (select_tag name, options_from_collection_for_select(collection, value_method, text_method, value), options)
    tag.div class: 'form-group' do
      (label ? ((label_tag label) + manage_tag) : manage_tag)
    end
  end

  def manage_select_tag(label, name, value, choices, options = {})
    options[:class] = "#{options[:class]} form-control select2 "
    manage_tag = (select_tag name, options_for_select(choices, value), options)
    tag.div class: 'form-group' do
      (label ? ((label_tag label) + manage_tag) : manage_tag)
    end
  end

  def manage_date_tag(label, name, value, options = {})
    options[:class] = "#{options[:class]} form-control datepicker"
    manage_tag = (text_field_tag name, value, options)
    tag.div class: 'form-group' do
      (label ? ((label_tag label) + manage_tag) : manage_tag)
    end
  end

  def manage_time_tag(label, name, value, options = {})
    options[:class] = "#{options[:class]} form-control"
    manage_tag = (time_field_tag name, value, options)
    tag.div class: 'form-group' do
      (label ? ((label_tag label) + manage_tag) : manage_tag)
    end
  end

  def manage_datetime_tag(label, name, value, options = {})
    options[:class] = "#{options[:class]} form-control datetimepicker"
    manage_tag = (text_field_tag name, value, options)
    tag.div class: 'form-group' do
      (label ? ((label_tag label) + manage_tag) : manage_tag)
    end
  end

  def human_attribute_enum(model_name, enum_attr, attr_name)
    Hash[enum_attr.map { |k| [I18n.t("activerecord.attributes.#{model_name}.#{attr_name}.#{k}"), k] }]
  end

  def human_attribute_enum_show(model_name, attr_name, value, default = '')
    value ? I18n.t("activerecord.attributes.#{model_name}.#{attr_name}.#{value}") : default
  end
end

