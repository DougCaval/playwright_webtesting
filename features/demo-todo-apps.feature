Feature: TodoMVC Application

    Background:
        Given the user is on the TodoMVC page

    # ----------------- NEW TODO -----------------
    Scenario: Add new todo items
        When the user adds todo items "buy some cheese" and "feed the cat"
        Then the list should display "buy some cheese" and "feed the cat"

    Scenario: Clear input field after adding a todo
        When the user adds a todo item "buy some cheese"
        Then the input field should be empty

    Scenario: Append new items to the bottom of the list
        Given the user has added default todos
        Then the list should show "3 items left"

    # ----------------- MARK ALL -----------------
    Scenario: Mark all items as completed
        Given the user has added default todos
        When the user marks all items as completed
        Then all items should appear completed

    Scenario: Clear completed state for all items
        Given the user has added default todos
        When the user marks all items as completed and then unchecks them
        Then no items should appear completed

    Scenario: Toggle 'mark all as complete' updates with individual items
        Given the user has added default todos
        When the user marks all and unmarks one item
        Then the toggle all checkbox should reflect the correct state

    # ----------------- ITEM BEHAVIOR -----------------
    Scenario: Mark individual items as completed
        When the user marks "buy some cheese" and "feed the cat" as completed
        Then both should have the completed class

    Scenario: Unmark completed items
        Given the user has added default todos
        When the user unmarks an item
        Then it should not have the completed class

    Scenario: Edit an existing item
        Given the user has added default todos
        When the user edits the second todo to "buy some sausages"
        Then the list should show updated text

    # ----------------- EDITING -----------------
    Scenario: Hide controls while editing
        Given the user has added default todos
        When the user edits the second item
        Then its checkbox and label should not be visible

    Scenario: Save edits on blur
        Given the user has added default todos
        When the user edits the second todo and moves focus away
        Then the new text should be saved

    Scenario: Trim entered text when editing
        Given the user has added default todos
        When the user edits the second todo adding spaces
        Then the text should be trimmed before saving

    Scenario: Remove todo if empty text is entered
        Given the user has added default todos
        When the user deletes the text of a todo
        Then the item should be removed

    Scenario: Cancel edit with escape key
        Given the user has added default todos
        When the user presses escape while editing
        Then the text should remain unchanged

    # ----------------- COUNTER -----------------
    Scenario: Display current number of todo items
        When the user adds todo items
        Then the counter should display the correct number of remaining items

    # ----------------- CLEAR COMPLETED -----------------
    Scenario: Show clear completed button
        Given the user has added default todos
        When the user completes one item
        Then the "Clear completed" button should be visible

    Scenario: Remove completed items when clearing
        Given the user has added default todos
        When the user clicks "Clear completed"
        Then only uncompleted items should remain

    Scenario: Hide clear button when no completed items
        Given the user has added default todos
        When all items are cleared
        Then the "Clear completed" button should be hidden

    # ----------------- PERSISTENCE -----------------
    Scenario: Persist data after reload
        When the user adds two todos and marks one completed
        Then after reloading the page the data should remain the same

    # ----------------- ROUTING -----------------
    Scenario: Display active items
        Given the user has added default todos
        When the user filters by Active
        Then only uncompleted items should be visible

    Scenario: Display completed items
        Given the user has added default todos
        When the user filters by Completed
        Then only completed items should be visible

    Scenario: Display all items
        Given the user has added default todos
        When the user filters by All
        Then all items should be visible

    Scenario: Highlight the active filter
        Given the user has added default todos
        When the user selects the "Active" or "Completed" filter
        Then the selected filter should be highlighted
