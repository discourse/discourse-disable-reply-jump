# frozen_string_literal: true

RSpec.describe "Disable Reply Jump", system: true do
  let!(:theme) { upload_theme_component }

  fab!(:topic_1, :topic)
  fab!(:post_1) do
    Fabricate(
      :post,
      raw:
        "long\ncontent\nto\nforce\nscrolling\non\npage\nlong\ncontent\nto\nforce\nscrolling\non\npage\nlong\ncontent\nto\nforce\nscrolling\non\npage\nlong\ncontent\nto\nforce\nscrolling\non\npage\nlong\ncontent\nto\nforce\nscrolling\non\npage\nlong\ncontent\nto\nforce\nscrolling\non\npage\n",
      topic: topic_1,
    )
  end
  fab!(:post_2) { Fabricate(:post, topic: topic_1) }
  fab!(:post_3) { Fabricate(:post, topic: topic_1) }

  fab!(:user) { Fabricate(:user, trust_level: TrustLevel[1], refresh_auto_groups: true) }

  before { sign_in(user) }

  it "user interface setting is present" do
    visit("/my/preferences/interface")

    expect(page).to have_css(".disable-jump")
  end

  it "user preference saves state" do
    visit("/my/preferences/interface")

    find(".disable-jump input").click
    find(".save-button").click

    expect(page).to have_css(".disable-jump input:checked")
  end

  it "scroll position does not change after replying when localStorage is set" do
    visit(topic_1.url)

    page.execute_script("localStorage.setItem('discourse-disable-jump-to-reply', 'true');")

    find(".timeline-footer-controls .reply-to-post").click
    find(".d-editor-textarea-wrapper textarea").set("This is my test reply content")
    find(".save-or-cancel .create").click

    # ensure the post has saved
    expect(page).not_to have_css(".saving-text")

    scroll_position = page.evaluate_script("window.scrollY;")

    expect(scroll_position).to eq(0)
  end
end
