
Blockly.Blocks['rotate'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Rotate");
    this.appendDummyInput()
        .appendField("choose rotation")
        .appendField(new Blockly.FieldDropdown([["LEFT","LEFT"], ["RIGHT","RIGHT"], ["BACK","BACK"]]), "dropdown_rotate");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(50);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['rotate'] = function(block) {
  var dropdown_dropdown_rotate = block.getFieldValue('dropdown_rotate');
  // TODO: Assemble python into code variable.
  var code = 'run_route([{"type": "rotate", "direction": ' + dropdown_dropdown_rotate + '}])\n';
  return code;
};

Blockly.Blocks['move'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Move");
    this.appendDummyInput()
        .appendField("Enter the distance in meters")
        .appendField(new Blockly.FieldNumber(0), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(50);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['move'] = function(block) {
  var number_name = block.getFieldValue('NAME');
  // TODO: Assemble python into code variable.
  var code = 'route_move = [{"type": "move", "distance": ' + number_name + '}]\n';
  return code;
};

Blockly.Blocks['function_run'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Function Run Route");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(90);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['function_run'] = function(block) {
  // TODO: Assemble python into code variable.
  var code = 'def run_route(route): pub = rospy.Publisher("cmd_vel", Twist, queue_size=10); rospy.init_node("circle_mode", anonymous=True) if "circle_mode" not in locals() else print("Node has already been initialized..."); [move(action["distance"], pub) if action["type"] == "move" else rotate(action["direction"], pub) for action in route]\n';
  return code;
};

Blockly.Blocks['function_download'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Function Download Upload");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(90);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['function_download'] = function(block) {
  // TODO: Assemble python into code variable.
  var code = 'while True: response = input("Já fez o carregamento/descarregamento (y/n)? ").lower(); break if response == "y" else None\n';
  return code;
};

Blockly.Blocks['function_run'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Function Run Route");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(90);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['function_run'] = function(block) {
  // TODO: Assemble python into code variable.
  var code = 'def run_route(route): pub = rospy.Publisher("cmd_vel", Twist, queue_size=10); rospy.init_node("circle_mode", anonymous=True) if "circle_mode" not in locals() else print("Node has already been initialized..."); [move(action["distance"], pub) if action["type"] == "move" else rotate(action["direction"], pub) for action in route]\n';
  return code;
};

Blockly.Blocks['function_move'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Function Move");
    this.appendDummyInput()
        .appendField("tell the speed")
        .appendField(new Blockly.FieldDropdown([["SLOW","SLOW"], ["NORMAL","NORMAL"], ["FAST","FAST"]]), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(90);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


// Bloco 'function_move'
Blockly.Python['function_move'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  // TODO: Assemble python into code variable.
  var code = 'def move(distance, pub):\nrate = rospy.Rate(10); twist = Twist(); speed = ' + dropdown_name +'; twist.linear.z = 0.00; twist.linear.y = 0.15 if speed == "SLOW" else 0.25 if speed == "NORMAL" else 0.75; twist.linear.x = 0.15 if speed == "SLOW" else 0.25 if speed == "NORMAL" else 0.75; movement_time = distance / twist.linear.x; start = time.time(); flag = True; distance_moved = 0.0; print(f"Movendo para frente por {distance} metros..."); while not rospy.is_shutdown() and flag: sample_time = time.time(); elapsed_time = sample_time - start; if elapsed_time > movement_time: flag = False; distance_moved = elapsed_time * twist.linear.x; distance_moved = round(distance_moved, 2); print(f"Movidos: {distance_moved} metros"); pub.publish(twist); twist = Twist(); pub.publish(twist); rate.sleep(); print("Movimento concluído.")\n';
  return code;
};

  Blockly.Blocks['connection_simulation'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Connection of Robot");
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Python['connection_simulation'] = function(block) {
    // TODO: Assemble python into code variable.
    var code = 'import rospy; time; from geometry_msgs.msg import Twist\n';
    return code;
  };

  Blockly.Blocks['function_rotate'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Function Rotate")
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(90);
      this.setHelpUrl("");
    }
  };
  
  Blockly.Python['function_rotate'] = function(block) {
    // You'll need to generate the JavaScript code for the 'rotate' function here
    var code = 'def rotate(direction, pub): rate = rospy.Rate(10); twist = Twist(); diameter = 0.2; radius = diameter / 2; angular_speed = 0.5; degrees = 90 if direction == "left" or direction == "right" else 180 if direction == "back" else (print("Direção inválida para rotação.") and None); twist.angular.z = angular_speed if direction == "left" else -angular_speed if direction == "right" else angular_speed if direction == "back" else (print("Direção inválida para rotação.") and None); radians = degrees * (3.141592653589793 / 180.0); movement_time = radians / angular_speed; start = time.time(); flag = True; while not rospy.is_shutdown() and flag: sample_time = time.time(); elapsed_time = sample_time - start; flag = False if elapsed_time > movement_time else True; pub.publish(twist); rate.sleep(); twist = Twist(); pub.publish(twist); rate.sleep()\n';
    return code;
  };

Blockly.Blocks['run_python_file'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Run Python file");
        this.appendValueInput("PATH FILE")
            .setCheck("String")
            .appendField("Path file");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Run a Python file specified by the user.");
        this.setHelpUrl("");
    }
    };

Blockly.Python['run_python_file'] = function(block) {
    var value_path_file = Blockly.Python.valueToCode(block, 'PATH FILE', Blockly.Python.ORDER_ATOMIC);
    var code = 'run_python_file(' + value_path_file + ')\n';
    return code;
};

Blockly.Blocks['define_route'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Define Route");
    this.appendDummyInput()
        .appendField("Enter the name of the route:")
        .appendField(new Blockly.FieldTextInput("name of route"), "name_route");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['define_route'] = function(block) {
  var text_name_route = block.getFieldValue('name_route');
  var statements_name = generator.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = 'route_'+text_name_route+' = ['+statements_name+']\n';
  return code;
};

Blockly.Blocks['move_from_route'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Move From Route");
    this.appendDummyInput()
        .appendField("Enter the distance in meters")
        .appendField(new Blockly.FieldNumber(0), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['move_from_route'] = function(block) {
  var number_name = block.getFieldValue('NAME');
  // TODO: Assemble python into code variable.
  var code = '{"type": "move", "distance": ' + number_name + '},\n';
  return code;
};

Blockly.Blocks['rotate_from_route'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Rotate From Route");
    this.appendDummyInput()
        .appendField("choose rotation")
        .appendField(new Blockly.FieldDropdown([["LEFT","LEFT"], ["RIGHT","RIGHT"], ["BACK","BACK"]]), "dropdown_rotate_route");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['rotate_from_route'] = function(block) {
  var dropdown_dropdown_rotate_route = block.getFieldValue('dropdown_rotate_route');
  // TODO: Assemble python into code variable.
  var code = '{"type": "rotate", "direction": ' + dropdown_dropdown_rotate_route + '},\n';
  return code;
};

Blockly.Blocks['run_route'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Run Route:");
    this.appendDummyInput()
        .appendField("Enter the name of the route")
        .appendField(new Blockly.FieldTextInput("Route name"), "name_route");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['run_route'] = function(block) {
  var text_name_route = block.getFieldValue('name_route');
  // TODO: Assemble python into code variable.
  var code = 'run_route('+text_name_route+')\n';
  return code;
};

Blockly.Blocks['download_upload'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Download / Upload");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['download_upload'] = function(block) {
  // TODO: Assemble python into code variable.
  var code = 'download_upload()\n';
  return code;
};